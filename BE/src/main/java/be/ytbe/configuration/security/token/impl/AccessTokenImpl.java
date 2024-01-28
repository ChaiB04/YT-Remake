package be.ytbe.configuration.security.token.impl;
import be.ytbe.configuration.security.token.AccessToken;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Getter
public class AccessTokenImpl implements AccessToken {
    private final String subject;
    private final String id;
    private final String roles;

    public AccessTokenImpl(String subject, String id, String roles) {
        this.subject = subject;
        this.id = id;
        this.roles = roles != null ? roles : "DEFAULT";
    }

}
