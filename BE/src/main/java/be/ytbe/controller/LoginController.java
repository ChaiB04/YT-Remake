package be.ytbe.controller;

import be.ytbe.business.LoginManager;
import be.ytbe.controller.converter.LoginRequestsConverter;
import be.ytbe.controller.dto.user.LoginRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@AllArgsConstructor
public class LoginController {

    private final LoginManager loginManager;

    @PostMapping()
    public ResponseEntity<String> loginUser(@RequestBody @Valid LoginRequest request){
        String accessToken = loginManager.login(LoginRequestsConverter.convertToDomain(request));
        return ResponseEntity.ok().body(accessToken);
    }

}
