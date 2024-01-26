package be.ytbe.persistance.entity;

import be.ytbe.domain.enumeration.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@Document(collection = "users")
public class UserEntity {
    @Id
    private String id;

    @NotBlank
    @Indexed(unique = true)
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    @Indexed(unique = true)
    private String email;

    private byte[] picture;

    private Role role;
}
