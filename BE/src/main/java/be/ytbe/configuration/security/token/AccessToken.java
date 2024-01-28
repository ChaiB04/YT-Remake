package be.ytbe.configuration.security.token;

public interface AccessToken {

    String getRoles();

    String getId();

    String getSubject();

}
