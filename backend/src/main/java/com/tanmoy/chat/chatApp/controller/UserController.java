package com.tanmoy.chat.chatApp.controller;

import com.tanmoy.chat.chatApp.model.User;
import com.tanmoy.chat.chatApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/register")
    public User registerUser(@RequestBody  User user){
        return userService.addUser(user);
    }

    @GetMapping("/retrieve")
    public User registerUser(@RequestParam  String userid){
        return userService.getUser(userid);
    }

    @PutMapping("/update")
    public User updateExistingUser(@RequestBody User user){
        return userService.updateUser(user);
    }
}
