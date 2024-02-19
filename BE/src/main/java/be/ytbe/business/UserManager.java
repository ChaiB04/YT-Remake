package be.ytbe.business;

import be.ytbe.domain.Post;
import be.ytbe.domain.User;

import java.util.List;

public interface UserManager {
    User get(String id);
    List<User> getByUsernameContains(String username);

    User create(User newUser);
    void update(User updatedUser);
    void delete(User deleteUser);

    boolean linkGoogleToAccount(String userId, String accessTokenGoogle);
}
