package be.ytbe.business;

public interface OAuthManager {
    String receiveAccessTokenFromApiToLogin(String code);
}
