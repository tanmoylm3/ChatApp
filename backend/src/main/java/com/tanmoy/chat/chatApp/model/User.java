package com.tanmoy.chat.chatApp.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


// Model class for the business details
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

	// Id for user 
	@Id
	private String userid;
	// Password for user
	private String upassword;
	/**
	 *Name for user 
	 */
	private String uname;
	// Generated authentication token for the user
	private String authToken;
	private String roomId;
	
	
	
	
	
}

