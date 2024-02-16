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

import java.util.*;

import java.lang.reflect.Field;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class PostManagerImpl implements PostManager {
    private final PostRepository postRepository;
    private Set<String> stopWords = new HashSet<>(Arrays.asList("the", "that", "this", "and", "is", "in", "it", "of")) ;

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
//            throw new PostNotFoundException();
            throw ex;
        }
    }

    @Override
    public List<Post> getByTitle(String title) {
        Map<Post, Integer> results = new HashMap<>();
        String[] titleWords = title.toLowerCase().split(" ");

        List<String> nonStopWords = Arrays.asList(titleWords);
        nonStopWords.removeAll(stopWords);

        for (String word : nonStopWords) {
            List<Post> posts = postRepository.findByTitleContainingIgnoreCase(word).stream()
                    .map(PostConverter::convertToDomain)
                    .toList();

            for (Post post : posts) {
                results.entrySet().stream()
                        .filter(p -> p.getKey().getId().equals(post.getId()))
                        .findFirst()
                        .ifPresentOrElse(
                                p -> results.merge(p.getKey(), 1, Integer::sum),
                                () -> results.put(post, 1)
                        );

            }
        }

        return results.entrySet().stream()
                .sorted(Map.Entry.<Post, Integer>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    public List<Post> getAll(){
        return postRepository.findAll()
                .stream()
                .map(PostConverter::convertToDomain)
                .toList();
    }

    public Post create(Post newPost){
        try{
//            if(checkFields(newPost)){
                PostEntity entity = postRepository.save(PostConverter.convertToEntity(newPost));
                return PostConverter.convertToDomain(entity);
//            }
//            else{
//                throw new PostException("Not all fields are filled in.");
//            }
        }
//        catch(IllegalAccessException ex)
//        {
//            throw new PostException("Not all fields are filled in. Message: " + ex.getMessage());
//        }
        catch(Exception ex)
        {
//            throw new PostException("Something went wrong with creating a post.");
            throw new PostException(ex.getMessage());
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
