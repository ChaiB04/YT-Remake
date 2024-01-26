package be.ytbe.domain;

import be.ytbe.domain.enumeration.Role;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class User {
    private String id;
    private String username;
    private String password;
    private String email;
    private byte[] picture;
    private Role role;
}
