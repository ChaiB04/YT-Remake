package be.ytbe.persistance;

import be.ytbe.persistance.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    boolean existsByEmail(String email);

    UserEntity findByEmail(String email);
    List<UserEntity> findByUsernameContainingIgnoreCase(String searchString);

}
