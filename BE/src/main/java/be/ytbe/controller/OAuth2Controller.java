package be.ytbe.controller;

import be.ytbe.business.LoginManager;
import be.ytbe.business.OAuthManager;
import be.ytbe.business.UserManager;
import be.ytbe.controller.dto.oauth.GetTokenExchange;
import be.ytbe.controller.dto.oauth.LinkGoogleAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class OAuth2Controller {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String client_id;

    @Autowired
    private OAuthManager oAuthManager;

    @Autowired
    private LoginManager loginManager;

    @Autowired
    private UserManager userManager;


    @GetMapping()
    public ResponseEntity<String> loginWithGoogleAccount(){

        try {
            String redirect = "https://accounts.google.com/o/oauth2/v2/auth?" +
                    "scope=" + URLEncoder.encode("https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",  "UTF-8") +
                    "&access_type=offline" +
                    "&include_granted_scopes=true" +
                    "&response_type=code" +
                    "&redirect_uri=" + URLEncoder.encode("http://localhost:5173/chooselogin", "UTF-8") +
                    "&client_id=" + client_id;

            return ResponseEntity.ok().body(redirect);
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping("ExchangeCode")
    public ResponseEntity<String> ExchangeCodeForToken(@RequestBody GetTokenExchange getTokenExchange){

        System.out.println("token : " + getTokenExchange.getCode());
        System.out.println("task : " + getTokenExchange.getTask());
        String accessToken = oAuthManager.receiveAccessTokenFromApiToLogin(getTokenExchange.getCode());

//        System.out.println("Accesstoken google: " + accessToken);
        return ResponseEntity.ok().body(accessToken);

    }

    @PostMapping("loginGoogle")
    public ResponseEntity<String> loginWithGoogleResponse(@RequestBody String code){

        String accessToken = loginManager.loginWithGoogleAccount(code);

        System.out.println("Accesstoken from yt: " + accessToken);
        if(accessToken != null){
            return ResponseEntity.ok().body(accessToken);
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("linkGoogle")
    public ResponseEntity<Void> linkGoogleAccount(@RequestHeader(HttpHeaders.AUTHORIZATION) final String accessToken, @RequestBody LinkGoogleAccount linkaccounts){

        if(userManager.linkGoogleToAccount(accessToken, linkaccounts.getGoogleToken())){
            return ResponseEntity.ok().build();
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
