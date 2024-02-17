package be.ytbe.business;

import be.ytbe.domain.Post;
import java.util.List;


public interface PostManager {
    Post get(String id);
    List<Post> getByTitleContains(String title);
    List<Post> getAll();
    Post create(Post post);

}
