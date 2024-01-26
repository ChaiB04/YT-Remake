package be.ytbe.business;

import be.ytbe.domain.Post;


public interface PostManager {
    Post get(String id);
    Post create(Post post);
}
