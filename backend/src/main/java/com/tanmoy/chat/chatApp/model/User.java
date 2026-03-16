package com.tanmoy.chat.chatApp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


// Model class for the business details
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

	@Id
	private String uname;
	// Generated authentication token for the user
	private String authToken;
	private List<String> roomId;
	
	
	
	
	
}

