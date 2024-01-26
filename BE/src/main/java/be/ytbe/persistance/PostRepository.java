package be.ytbe.persistance;

import be.ytbe.persistance.entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<PostEntity, String> {
}
