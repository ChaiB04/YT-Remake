package be.ytbe.persistance;

import be.ytbe.persistance.entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<PostEntity, String> {
    @Query("{'$or':[{'title': {'$regex' : ?0, '$options' : 'i'}}, {'creator.username': {'$regex' : ?0, '$options' : 'i'}}]}")
    List<PostEntity> findByTitleOrCreatorUsernameIgnoreCase(String searchString);
}
