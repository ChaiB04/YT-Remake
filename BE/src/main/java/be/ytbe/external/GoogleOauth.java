package be.ytbe.external;

public interface GoogleOauth {

    String getAccessToken(String authorizationCode);
    String getSub(String accessToken);
}
