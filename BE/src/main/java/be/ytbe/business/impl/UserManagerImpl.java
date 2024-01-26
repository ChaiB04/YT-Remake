package be.ytbe.business.impl;

import be.ytbe.business.UserManager;
import be.ytbe.business.exception.UserException;
import be.ytbe.domain.User;
import be.ytbe.domain.enumeration.Role;
import be.ytbe.persistance.UserRepository;
import be.ytbe.persistance.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserManagerImpl implements UserManager {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

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
            throw new UserException("Something went wrong with creating the account.");
        }
    }

}
