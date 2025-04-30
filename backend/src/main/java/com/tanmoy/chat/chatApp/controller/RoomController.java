package com.tanmoy.chat.chatApp.controller;

import com.tanmoy.chat.chatApp.model.Messages;
import com.tanmoy.chat.chatApp.model.Room;
import com.tanmoy.chat.chatApp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class RoomController {
    @Autowired
    RoomService roomService;

    @PostMapping("/create")
    public Room createRoom(@RequestBody String roomId){
        return roomService.createNewRoom(roomId);
    }
    @GetMapping("/retrieve/{roomId}")
    public Room joinRoom(@PathVariable String roomId){
        return roomService.getRoomById(roomId);
    }
    @GetMapping("/{roomId}/messages")
    public List<Messages> getMessages(
            @PathVariable String roomId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
    ){
        Room room = roomService.getRoomById(roomId);
        List<Messages> messages = room.getMessages();
        int start = Math.max(0, messages.size() - (page + 1) * size);
        int end = Math.min(messages.size(), start + size);
        List<Messages> paginatedMessages = messages.subList(start, end);
        return room.getMessages();
    }
}
