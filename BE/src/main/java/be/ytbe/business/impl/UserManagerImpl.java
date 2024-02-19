package be.ytbe.business.impl;

import be.ytbe.business.AccessTokenManager;
import be.ytbe.business.UserManager;
import be.ytbe.business.converter.UserConverter;
import be.ytbe.business.exception.EmailAlreadyInUseException;
import be.ytbe.business.exception.UserException;
import be.ytbe.business.exception.UserNotFoundException;
import be.ytbe.configuration.security.token.AccessToken;
import be.ytbe.domain.User;
import be.ytbe.domain.enumeration.Role;
import be.ytbe.external.GoogleOauth;
import be.ytbe.persistance.OAuthGoogleRepository;
import be.ytbe.persistance.UserRepository;
import be.ytbe.persistance.entity.GoogleUserEntity;
import be.ytbe.persistance.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.apache.logging.log4j.util.Strings.isEmpty;

@Service
@AllArgsConstructor
public class  UserManagerImpl implements UserManager {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final OAuthGoogleRepository oAuthGoogleRepository;

    private final GoogleOauth googleOauth;

    private final AccessTokenManager accessTokenManager;

    public User get(String id){
        try{
            return userRepository.findById(id)
                    .map(UserConverter::convertToDomain)
                    .orElseThrow(UserNotFoundException::new);
        }
        catch (UserNotFoundException ex){
            throw  ex;
        }
        catch (Exception ex){
            throw new UserException("Something went wrong");
        }

    }

    @Override
    public List<User> getByUsernameContains(String username) {
        Map<User, Integer> results = new HashMap<>();
        String[] usernameWords = username.toLowerCase().split(" ");

        for (String word : usernameWords) {
            List<User> users = userRepository.findByUsernameContainingIgnoreCase(word).stream()
                    .map(UserConverter::convertToDomain)
                    .toList();

            for (User user : users) {
                results.entrySet().stream()
                        .filter(u -> u.getKey().getId().equals(user.getId()))
                        .findFirst()
                        .ifPresentOrElse(
                                u -> results.merge(u.getKey(), 1, Integer::sum),
                                () -> results.put(user, 1)
                        );

            }
        }

        return results.entrySet().stream()
                .sorted(Map.Entry.<User, Integer>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    public User create(User newUser){
        try{
            if(newUser != null){

                if (userRepository.existsByEmail(newUser.getEmail())){
                    throw new EmailAlreadyInUseException();
                }

                String encodedPassword = passwordEncoder.encode(newUser.getPassword());

                newUser.setPassword(encodedPassword);
                newUser.setRole(Role.VIEWER);

                UserEntity entity = userRepository.save(UserConverter.convertToEntity(newUser));

                return UserConverter.convertToDomain(entity);
            }
            else{
                throw new UserException("User is null");
            }
        }
        catch (EmailAlreadyInUseException ex){
            throw ex;
        }
        catch(Exception ex){
            throw new UserException("Something went wrong with creating the account.");
        }
    }

    public void update(User updatedUser){
        try {
            User userToUpdate = userRepository.findById(updatedUser.getId())
                    .map(UserConverter::convertToDomain)
                    .orElseThrow(UserNotFoundException::new);

            if (!Objects.equals(userToUpdate.getEmail(), updatedUser.getEmail()) &&
                    userRepository.existsByEmail(updatedUser.getEmail())) {
                throw new EmailAlreadyInUseException();
            }

            updateFields(updatedUser, userToUpdate);
            userRepository.save(UserConverter.convertToEntity(userToUpdate));
        }
        catch (UserNotFoundException | EmailAlreadyInUseException ex){
            throw ex;
        }
        catch (Exception ex){
            throw new UserException("Something went wrong with updating the account");
        }

    }

    private void updateFields(User updatedUser, User userToUpdate){
        if(!isEmpty(updatedUser.getPassword())){
            String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
            userToUpdate.setPassword(encodedPassword);
        }

        userToUpdate.setEmail(updatedUser.getEmail());
        userToUpdate.setUsername(updatedUser.getUsername());
        userToUpdate.setPicture(updatedUser.getPicture());
    }


    public void delete(User deleteUser){
        try{

            User userToDelete = userRepository.findById(deleteUser.getId())
                    .map(UserConverter::convertToDomain)
                    .orElseThrow(UserNotFoundException::new);

            if(!passwordEncoder.matches(deleteUser.getPassword(), userToDelete.getPassword())){
                throw new UserException("Passwords don't match. Cannot delete user.");
            }

            userRepository.delete(UserConverter.convertToEntity(userToDelete));
        }
        catch (UserNotFoundException ex){
            throw ex;
        }
        catch (Exception ex){
            throw new UserException("Something went wrong with deleting the account");
        }
    }


    public boolean linkGoogleToAccount(String accesstoken, String accessTokenGoogle){

        String id = accessTokenManager.getUserIdFromToken(accesstoken);
        String sub = googleOauth.getSub(accessTokenGoogle);

        GoogleUserEntity entity = GoogleUserEntity.builder()
                .user_id(id)
                .sub(sub)
                .build();

        if(oAuthGoogleRepository.existsBySub(sub)){
            throw new UserException("Google account is already linked!");

        }
        else{
            oAuthGoogleRepository.save(entity);
            return true;
        }

    }

}
