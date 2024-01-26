package be.ytbe.business.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserException extends ResponseStatusException {
    public UserException(String message) {super(HttpStatus.BAD_REQUEST, message);}

}
