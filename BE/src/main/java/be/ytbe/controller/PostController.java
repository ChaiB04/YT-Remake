package be.ytbe.controller;

import be.ytbe.business.PostManager;
import be.ytbe.controller.converter.PostRequestsConverter;
import be.ytbe.controller.dto.post.CreatePostRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import be.ytbe.domain.Post;

@RestController
@RequestMapping("/post")
@AllArgsConstructor
public class PostController {
    private final PostManager postManager;


    @GetMapping("{id}")
    public ResponseEntity<Post> getPost(@PathVariable(value = "id") final String id){
        final Post post = postManager.get(id);

        return ResponseEntity.ok().body(post);
    }

    //TODO Will have to add accesstoken to check access control
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody CreatePostRequest request){
        final Post postToCreate = PostRequestsConverter.convertCreateRequest(request);
        final Post response = postManager.create(postToCreate);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
