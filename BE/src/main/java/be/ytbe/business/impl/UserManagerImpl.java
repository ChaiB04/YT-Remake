package be.ytbe.business.impl;

import be.ytbe.business.UserManager;
import be.ytbe.business.converter.UserConverter;
import be.ytbe.business.exception.EmailAlreadyInUseException;
import be.ytbe.business.exception.UserException;
import be.ytbe.business.exception.UserNotFoundException;
import be.ytbe.domain.User;
import be.ytbe.domain.enumeration.Role;
import be.ytbe.persistance.UserRepository;
import be.ytbe.persistance.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.apache.logging.log4j.util.Strings.isEmpty;

@Service
@AllArgsConstructor
public class  UserManagerImpl implements UserManager {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

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

    public User create(User newUser){
        try{
            if(newUser != null){

                String encodedPassword = passwordEncoder.encode(newUser.getPassword());

                UserEntity user = UserEntity.builder()
                        .email(newUser.getEmail())
                        .username(newUser.getUsername())
                        .password(encodedPassword)
                        .role(Role.VIEWER)
                        .picture(newUser.getPicture())
                        .build();

                UserEntity entity = userRepository.save(user);

                return User.builder()
                        .id(entity.getId())
                        .email(entity.getEmail())
                        .username(entity.getUsername())
                        .password(entity.getPassword())
                        .role(entity.getRole())
                        .picture(entity.getPicture())
                        .build();
            }
            else{
                throw new UserException("User is null");
            }
        }
        catch(Exception ex){
//            throw new UserException("Something went wrong with creating the account.");
            throw new UserException(ex.getMessage());

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


    public void delete(String id){
        try{

            User userToDelete = userRepository.findById(id)
                    .map(UserConverter::convertToDomain)
                    .orElseThrow(UserNotFoundException::new);

            userRepository.delete(UserConverter.convertToEntity(userToDelete));
        }
        catch (UserNotFoundException ex){
            throw ex;
        }
        catch (Exception ex){
            throw new UserException("Something went wrong with deleting the account");
        }
    }

}
