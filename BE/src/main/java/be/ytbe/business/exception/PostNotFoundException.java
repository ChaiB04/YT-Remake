package be.ytbe.business.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PostNotFoundException extends ResponseStatusException {
    public PostNotFoundException() {super(HttpStatus.NOT_FOUND, "Post not found.");}
}
