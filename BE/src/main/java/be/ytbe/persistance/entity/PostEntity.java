package be.ytbe.persistance.entity;

import be.ytbe.domain.User;
import be.ytbe.domain.enumeration.PostType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@Document(collection = "posts")
public class PostEntity {
    @Id
    private String id;

    private String title;
    private byte[] picture;
    private String content;
    private String description;
    private UserEntity creator;
    private PostType postType;
    private String[] tags;
}
