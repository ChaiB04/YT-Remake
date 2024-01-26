package be.ytbe.business.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PostException  extends ResponseStatusException {
    public PostException(String message) {super(HttpStatus.BAD_REQUEST, message);}
}
