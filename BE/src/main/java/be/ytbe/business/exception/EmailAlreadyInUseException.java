package be.ytbe.business.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EmailAlreadyInUseException extends ResponseStatusException {
    public EmailAlreadyInUseException() {super(HttpStatus.BAD_REQUEST, "The provided email is already in use.");}
}
