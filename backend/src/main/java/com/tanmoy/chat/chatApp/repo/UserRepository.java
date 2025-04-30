package com.tanmoy.chat.chatApp.repo;

import com.tanmoy.chat.chatApp.model.Room;
import com.tanmoy.chat.chatApp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Room, String> {
    User findByUserId(String roomId);
}
