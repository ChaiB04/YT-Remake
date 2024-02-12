package be.ytbe.controller.dto.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class DeleteUserRequest {
    private String id;
    private String password;
}