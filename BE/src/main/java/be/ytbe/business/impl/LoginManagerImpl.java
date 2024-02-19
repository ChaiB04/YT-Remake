package be.ytbe.business.impl;

import be.ytbe.business.LoginManager;
import be.ytbe.business.converter.UserConverter;
import be.ytbe.business.exception.UserException;
import be.ytbe.business.exception.UserNotFoundException;
import be.ytbe.configuration.security.token.AccessTokenEncoderDecoder;
import be.ytbe.configuration.security.token.impl.AccessTokenImpl;
import be.ytbe.domain.User;
import be.ytbe.external.GoogleOauth;
import be.ytbe.persistance.OAuthGoogleRepository;
import be.ytbe.persistance.UserRepository;
import be.ytbe.persistance.entity.GoogleUserEntity;
import be.ytbe.persistance.entity.UserEntity;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginManagerImpl implements LoginManager {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AccessTokenEncoderDecoder accessTokenEncoderDecoder;
    private GoogleOauth googleApi;
    private OAuthGoogleRepository oAuthGoogleRepository;

    public String login(User user){
        try{
            Optional<UserEntity> entity = Optional.of(userRepository.findByEmail(user.getEmail()));

            if(entity.isPresent()){
                User foundUser = UserConverter.convertToDomain(entity.get());

                if(!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())){
                    throw new UserException("Passwords do not match");
                }
                else{
                    return generateAccessToken(foundUser);
                }
            }
            else{
                throw new UserNotFoundException();
            }

        }
        catch(Exception ex){
            throw new UserException(ex.getMessage());
        }

    }

    private String generateAccessToken(User user){
        try{
            String role = user.getRole().toString();

            String sub = user.getEmail();

            String id = user.getId();

            return accessTokenEncoderDecoder.encode(
                    new AccessTokenImpl(sub, id, role));
        }
        catch(Exception ex){
            throw new UserException("Cannot generate access token.");
        }
    }


    public String loginWithGoogleAccount(String googleAccessToken){
        String sub = googleApi.getSub(googleAccessToken);

        GoogleUserEntity entity = oAuthGoogleRepository.findBySub(sub);
        Optional<UserEntity> optionalUserEntity = userRepository.findById(entity.getUser_id());

        if(optionalUserEntity.isPresent()){
            User user = UserConverter.convertToDomain(optionalUserEntity.get());
            return generateAccessToken(user);
        }
        else{
            throw new UserException("Cannot log in with google account");
        }

    }
}
