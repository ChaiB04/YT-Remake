package be.ytbe.controller;

import be.ytbe.business.UserManager;
import be.ytbe.domain.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private UserManager userManager;

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User request) {

        User response = userManager.create(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
