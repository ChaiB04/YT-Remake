package be.ytbe.persistance;

import be.ytbe.persistance.entity.GoogleUserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableMongoRepositories
public interface OAuthGoogleRepository extends MongoRepository<GoogleUserEntity, String> {
    GoogleUserEntity findBySub(String sub);
    boolean existsBySub(String sub);
}
