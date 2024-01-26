package be.ytbe.configuration.security.token.impl;
import be.ytbe.configuration.security.token.AccessToken;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Getter
public class AccessTokenImpl implements AccessToken {
    private final String subject;
    private final Integer id;
    private final String roles;

    public AccessTokenImpl(String subject, Integer id, String roles) {
        this.subject = subject;
        this.id = id;
        this.roles = roles != null ? roles : "DEFAULT";
    }

}
