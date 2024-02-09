package be.ytbe.business.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserIdMismatchException extends ResponseStatusException {
    public UserIdMismatchException() {super(HttpStatus.FORBIDDEN, "There has been a user ID mismatch");}
}
