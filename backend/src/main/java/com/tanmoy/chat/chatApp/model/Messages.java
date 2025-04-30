package com.tanmoy.chat.chatApp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Messages {
    private String sender;
    private String content;
    private LocalDateTime currentTime;

    public Messages(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.currentTime = LocalDateTime.now();
    }
}
