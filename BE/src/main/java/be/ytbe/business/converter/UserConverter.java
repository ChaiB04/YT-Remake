package be.ytbe.business.converter;

import be.ytbe.domain.User;
import be.ytbe.persistance.entity.UserEntity;

import java.util.Objects;

public final class UserConverter {

    private UserConverter(){}

    public static User convertToDomain(UserEntity userEntity){
        if(Objects.isNull(userEntity)){
            return User.builder().build();
        }

        return User.builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .role(userEntity.getRole())
                .picture(userEntity.getPicture())
                .build();
    }

    public static UserEntity convertToEntity(User user){
        if(Objects.isNull(user)){
            return UserEntity.builder().build();
        }

        return UserEntity.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole())
                .picture(user.getPicture())
                .build();
    }
}
