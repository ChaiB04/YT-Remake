package be.ytbe.business.converter;

import be.ytbe.domain.Post;
import be.ytbe.persistance.entity.PostEntity;

import java.util.Objects;

public final class PostConverter {

    private PostConverter(){}

    public static Post convertToDomain(PostEntity postEntity){
        if (Objects.isNull(postEntity)){
            return Post.builder().build();
        }

        return Post.builder()
                .id(postEntity.getId())
                .content(postEntity.getContent())
                .title(postEntity.getTitle())
                .picture(postEntity.getPicture())
                .description(postEntity.getDescription())
                .creator(UserConverter.convertToDomain(postEntity.getCreator()))
                .postType(postEntity.getPostType())
                .tags(postEntity.getTags())
                .build();
    }

    public static PostEntity convertToEntity(Post post){
        if (Objects.isNull(post)){
            return PostEntity.builder().build();
        }

        return PostEntity.builder()
                .id(post.getId())
                .content(post.getContent())
                .title(post.getTitle())
                .picture(post.getPicture())
                .description(post.getDescription())
                .creator(UserConverter.convertToEntity(post.getCreator()))
                .postType(post.getPostType())
                .tags(post.getTags())
                .build();
    }
}
