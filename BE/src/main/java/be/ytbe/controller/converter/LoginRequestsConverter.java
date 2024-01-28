package be.ytbe.controller.converter;

import be.ytbe.controller.dto.user.LoginRequest;
import be.ytbe.domain.User;

public class LoginRequestsConverter {

    public LoginRequestsConverter(){}

    public static User convertToDomain(LoginRequest request){
        return User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }
}
