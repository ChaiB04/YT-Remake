package be.ytbe.persistance;

import be.ytbe.persistance.entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PostRepository extends MongoRepository<PostEntity, String> {
    List<PostEntity> findByTitleContainingIgnoreCase(String searchString);
}
