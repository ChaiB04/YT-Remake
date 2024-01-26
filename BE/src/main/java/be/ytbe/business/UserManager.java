package be.ytbe.business;

import be.ytbe.domain.User;

public interface UserManager {
    User get(String id);
    User create(User newUser);
    void update(User updatedUser);
}
