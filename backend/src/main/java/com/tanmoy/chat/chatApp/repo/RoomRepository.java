package com.tanmoy.chat.chatApp.repo;

import com.tanmoy.chat.chatApp.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, String> {
    Room findByRoomId(String roomId);
}
