package be.ytbe.controller;

import be.ytbe.business.AccessTokenManager;
import be.ytbe.business.UserManager;
import be.ytbe.controller.converter.UserRequestsConverter;
import be.ytbe.controller.dto.user.CreateUserRequest;
import be.ytbe.controller.dto.user.DeleteUserRequest;
import be.ytbe.controller.dto.user.UpdateUserRequest;
import be.ytbe.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private UserManager userManager;
    private AccessTokenManager accessTokenManager;

    @GetMapping("{id}")
    public ResponseEntity<User> getUser(@PathVariable(value = "id") final String id){
        final User user = userManager.get(id);

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/accessToken")
    public ResponseEntity<User> getUserByAccessToken(@RequestHeader(HttpHeaders.AUTHORIZATION) final String accessToken){
        final String id = accessTokenManager.getUserIdFromToken(accessToken);
        final User user = userManager.get(id);

        return ResponseEntity.ok().body(user);
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        final User userToCreate = UserRequestsConverter.convertCreateRequest(request);
        final User response = userManager.create(userToCreate);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    //TODO Will have to add accesstoken to check access control
    @PutMapping("{id}")
    public ResponseEntity<Void> updateUser(@PathVariable("id") final String id,
                                           @RequestBody UpdateUserRequest request) {
        request.setId(id);
        final User updatedUser = UserRequestsConverter.convertUpdateRequest(request);
        userManager.update(updatedUser);

        return ResponseEntity.noContent().build();
    }

    //TODO Will have to add accesstoken to check access control
    @DeleteMapping()
    public ResponseEntity<Void> deleteUser(@RequestBody DeleteUserRequest request){
        final User deleteUser = UserRequestsConverter.convertDeleteRequest(request);
        userManager.delete(deleteUser);
        return ResponseEntity.noContent().build();
    }
}
