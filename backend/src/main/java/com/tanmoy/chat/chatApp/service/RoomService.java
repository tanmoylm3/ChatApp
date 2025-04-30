package com.tanmoy.chat.chatApp.service;

import com.tanmoy.chat.chatApp.model.Room;
import com.tanmoy.chat.chatApp.repo.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room createNewRoom(String roomId){
        Room room = new Room();
        room.setRoomId(roomId);

        roomRepository.save(room);
        return room;
    }

    public Room getRoomById(String roomId){
        return roomRepository.findByRoomId(roomId);
    }

    public void saveRoomDetails(Room room){
        roomRepository.save(room);
    }
}
