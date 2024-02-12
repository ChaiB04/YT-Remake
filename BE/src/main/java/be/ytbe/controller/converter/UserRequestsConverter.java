package be.ytbe.controller.converter;

import be.ytbe.controller.dto.user.CreateUserRequest;
import be.ytbe.controller.dto.user.DeleteUserRequest;
import be.ytbe.controller.dto.user.UpdateUserRequest;
import be.ytbe.domain.User;

public final class UserRequestsConverter {

    private UserRequestsConverter(){}


    public static User convertCreateRequest(CreateUserRequest request){
        return User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .picture(request.getPicture())
                .role(request.getRole())
                .build();
    }

    public static User convertUpdateRequest(UpdateUserRequest request){
        return User.builder()
                .id(request.getId())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .picture(request.getPicture())
                .build();
    }

    public static User convertDeleteRequest(DeleteUserRequest request){
        return User.builder()
                .id(request.getId())
                .password(request.getPassword())
                .build();
    }
}
