package be.ytbe.domain;

import be.ytbe.domain.enumeration.PostType;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Post {
    private String id;
    private String title;
    private byte[] picture;
    private Object content;
    private String description;
    private User creator;
    private PostType postType;
}
