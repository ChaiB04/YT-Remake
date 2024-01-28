package be.ytbe.business.impl;

import be.ytbe.business.AccessTokenManager;
import be.ytbe.configuration.security.token.AccessTokenEncoderDecoder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccessTokenManagerImpl implements AccessTokenManager {
    private final AccessTokenEncoderDecoder accessTokenEncoderDecoder;
    @Override
    public String getUserIdFromToken(String accessToken) {
        String tokenToDecode = accessToken.replace("\"", "").substring(7);

        return accessTokenEncoderDecoder.decode(tokenToDecode).getId();
    }
}
