package be.ytbe.controller;

import be.ytbe.business.AccessTokenManager;
import be.ytbe.business.PostManager;
import be.ytbe.controller.converter.PostRequestsConverter;
import be.ytbe.controller.dto.post.CreatePostRequest;
import be.ytbe.external.GoogleCloudStorageClient;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import be.ytbe.domain.Post;
import java.util.List;

@RestController
@RequestMapping("/post")
@AllArgsConstructor
public class PostController {
    private final PostManager postManager;
    private final AccessTokenManager accessTokenManager;
    private final GoogleCloudStorageClient googleCloudStorageClient;

    @GetMapping()
    public ResponseEntity<List<Post>> getAllPosts(){
        final List<Post> posts = postManager.getAll();

        return ResponseEntity.ok().body(posts);
    }

    @GetMapping("/title")
    public ResponseEntity<List<Post>> getPostsByTitle(@RequestParam String title){
        final List<Post> posts = postManager.getByTitle(title);

        return ResponseEntity.ok().body(posts);
    }

    @GetMapping("{id}")
    public ResponseEntity<Post> getPost(@PathVariable(value = "id") final String id){
        final Post post = postManager.get(id);

        return ResponseEntity.ok().body(post);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody CreatePostRequest request,
                                           @RequestHeader(HttpHeaders.AUTHORIZATION) final String accessToken){
        accessTokenManager.compareUserIdWithToken(accessToken, request.getCreator().getId());

        final String contentUrl = googleCloudStorageClient.uploadVideo(request.getContent());
        final Post postToCreate = PostRequestsConverter.convertCreateRequest(request, contentUrl);

        final Post response = postManager.create(postToCreate);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
