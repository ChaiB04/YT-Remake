package be.ytbe.business;

public interface AccessTokenManager {
    String getUserIdFromToken(String accessToken);
    void compareUserIdWithToken(String accessToken, String userId);
}
