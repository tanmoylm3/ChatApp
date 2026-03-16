package com.tanmoy.chat.chatApp.service;

import com.tanmoy.chat.chatApp.InMemoryStorage.OtpStorage;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {
//    @Value("${twilio.accountSid}")
//    private String accountSid;
//
//    @Value("${twilio.authToken}")
//    private String authToken;
//
//    @Value("${twilio.phoneNumber}")
//    private String twilioPhoneNumber;
    @Autowired
    private JavaMailSender mailSender;

    public String generateOtp() {
        return String.format("%06d", new Random().nextInt(100000));
    }

    public void sendOtp(String email, String otp) {
 //       Twilio.init(accountSid, authToken);
//        Message message = Message.creator(
//                        new PhoneNumber(phoneNumber),
//                        new PhoneNumber(twilioPhoneNumber),
//                        "Your OTP is: " + otp)
//                .create();
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject("--------OTP--------");
        simpleMailMessage.setText("Your OTP is: "+ otp);

        mailSender.send(simpleMailMessage);

    }

    public Boolean verifyOtp(String phoneNumber, String otp) {
        return otp.equals(OtpStorage.getStore().get(phoneNumber));
    }
}
