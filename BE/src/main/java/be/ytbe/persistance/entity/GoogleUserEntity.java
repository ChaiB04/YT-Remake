package be.ytbe.persistance.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "GoogleUsers")
public class GoogleUserEntity
{
    @Id
    private String id;

    private String user_id;
    private String sub;
}
