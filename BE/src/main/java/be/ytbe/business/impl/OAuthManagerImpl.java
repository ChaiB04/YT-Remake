package be.ytbe.business.impl;

import be.ytbe.business.OAuthManager;
import be.ytbe.external.GoogleOauth;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OAuthManagerImpl implements OAuthManager {

    private GoogleOauth googleApi;
    public String receiveAccessTokenFromApiToLogin(String code){
        try{
            return googleApi.getAccessToken(code);
        }
        catch(Exception ex){
            throw new OAuth2AuthenticationException("Cannot receive access token from Google Api");
        }
    }
}
