package com.tanmoy.chat.chatApp.service;

import com.tanmoy.chat.chatApp.model.User;
import com.tanmoy.chat.chatApp.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class UserService {

    private  final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user){

        userRepository.save(user);

        return user;
    }

    public User getUser(String uname){
        return userRepository.findByUname(uname);
    }


    public User updateUser(User user) {
        User existingUser = userRepository.findByUname(user.getUname());
        existingUser.setAuthToken(user.getAuthToken());
        List<String> newRoomList = Stream.concat(user.getRoomId().stream(), existingUser.getRoomId().stream()).toList();
        existingUser.setRoomId(newRoomList);

        userRepository.save(existingUser);
        return existingUser;
    }
}
