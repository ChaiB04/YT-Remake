package be.ytbe.persistance;

import be.ytbe.domain.User;
import be.ytbe.persistance.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, Integer> {
}
