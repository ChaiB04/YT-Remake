package be.ytbe.controller.dto.post;

import be.ytbe.domain.User;
import be.ytbe.domain.enumeration.PostType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class CreatePostRequest {
    private String title;
    private byte[] picture;
    private byte[] content;
    private String description;
    private User creator;
    private PostType postType;
}
