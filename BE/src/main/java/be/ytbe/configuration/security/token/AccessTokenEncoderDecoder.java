package be.ytbe.configuration.security.token;

public interface AccessTokenEncoderDecoder {
    String encode(AccessToken accessToken);

    AccessToken decode(String accessTokenEncoded);
}
