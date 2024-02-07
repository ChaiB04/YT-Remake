package be.ytbe.controller.converter;

import be.ytbe.controller.dto.post.CreatePostRequest;
import be.ytbe.domain.Post;

public final class PostRequestsConverter {

    private PostRequestsConverter(){}


    public static Post convertCreateRequest(CreatePostRequest request, String contentUrl){
        return Post.builder()
                .content(contentUrl)
                .title(request.getTitle())
                .picture(request.getPicture())
                .description(request.getDescription())
                .creator(request.getCreator())
                .postType(request.getPostType())
                .build();
    }
}
