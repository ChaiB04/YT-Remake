package be.ytbe.business.impl;

import be.ytbe.business.converter.PostConverter;
import be.ytbe.business.exception.PostException;
import be.ytbe.business.exception.PostNotFoundException;
import be.ytbe.domain.Post;
import be.ytbe.business.PostManager;
import be.ytbe.persistance.PostRepository;
import be.ytbe.persistance.entity.PostEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Optional;


@Service
@AllArgsConstructor
public class PostManagerImpl implements PostManager {
    private final PostRepository postRepository;

    public Post get(String id){
        try{
            Optional<PostEntity> optionalPost = postRepository.findById(id);

            if(optionalPost.isPresent()){
                return PostConverter.convertToDomain(optionalPost.get());
            }
            else{
                throw new PostNotFoundException();
            }
        }
        catch(Exception ex){
            throw new PostNotFoundException();
        }
    }

    public Post create(Post newPost){
        try{

            if(checkFields(newPost)){
                PostEntity entity = postRepository.save(PostConverter.convertToEntity(newPost));
                return PostConverter.convertToDomain(entity);
            }
            else{
                throw new PostException("Not all fields are filled in.");
            }
        }
        catch(IllegalAccessException ex)
        {
            throw new PostException("Not all fields are filled in. Message: " + ex.getMessage());
        }
        catch(Exception ex)
        {
            throw new PostException("Something went wrong with creating a post.");
        }
    }

    private boolean checkFields(Object o) throws IllegalAccessException{
        for(Field f : o.getClass().getDeclaredFields()){
            f.setAccessible(true);

            if (f.getName().equals("id")) {
                continue;
            }

            if (f.get(o) == null) {
                return false;
            }
        }
        return true;
    }
}
