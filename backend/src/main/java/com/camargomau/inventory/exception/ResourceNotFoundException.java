package com.camargomau.inventory.exception;

// Custom exception thrown when a requested resource (e.g., item, user) is not found in the database
// Used to return a 404 Not Found response in the API

public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String message) {
		super(message);
	}
}
