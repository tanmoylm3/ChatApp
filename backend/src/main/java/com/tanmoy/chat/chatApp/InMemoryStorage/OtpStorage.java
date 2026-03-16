package com.tanmoy.chat.chatApp.InMemoryStorage;

import lombok.Getter;

import java.util.HashMap;

public class OtpStorage {

    @Getter
    private static HashMap<String,String> store = new HashMap<>();


    public static void setStore(HashMap<String, String> store) {
        OtpStorage.store = store;
    }
}
