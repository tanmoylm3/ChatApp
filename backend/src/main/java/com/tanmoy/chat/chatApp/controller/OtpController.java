package com.tanmoy.chat.chatApp.controller;

import com.tanmoy.chat.chatApp.InMemoryStorage.OtpStorage;
import com.tanmoy.chat.chatApp.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/otp")
@CrossOrigin("*")
public class OtpController {
    @Autowired
    private OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        String otp = otpService.generateOtp();
        otpService.sendOtp(email, otp);
        // Store OTP (e.g., in a database or cache) associated with the phone number for verification
        HashMap<String,String> currentStore = OtpStorage.getStore();
        currentStore.put(email,otp);
        OtpStorage.setStore(currentStore);
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        // Retrieve stored OTP and compare with the provided OTP
        // If valid, return success; otherwise, return failure
        // Example (replace with your actual logic):
        // String storedOtp = // Retrieve OTP from storage
        // if (otp.equals(storedOtp)) {
        //     return ResponseEntity.ok("OTP verified successfully");
        // } else {
        //     return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
        // }
        if(otpService.verifyOtp(email,otp)){
            return ResponseEntity.ok("OTP verified successfully");
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
        }
        //return ResponseEntity.ok("Verification logic needs to be implemented");
    }
}
