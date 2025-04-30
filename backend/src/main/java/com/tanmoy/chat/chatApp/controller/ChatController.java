package com.tanmoy.chat.chatApp.controller;

import com.tanmoy.chat.chatApp.model.MessageRequest;
import com.tanmoy.chat.chatApp.model.Messages;
import com.tanmoy.chat.chatApp.model.Room;
import com.tanmoy.chat.chatApp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ChatController {
    @Autowired
    RoomService roomService;

    @MessageMapping("sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Messages sendMessage(@DestinationVariable String roomId , @RequestBody MessageRequest request){
        Room room = roomService.getRoomById(request.getRoomId());
        Messages message = new Messages(request.getSender(), request.getContent());
        room.getMessages().add(message);
        roomService.saveRoomDetails(room);

        return  message;
    }
}
