package be.ytbe.business;

import be.ytbe.domain.User;

public interface LoginManager {
    String login(User user);
    String loginWithGoogleAccount(String googleAccessToken);
}
