package be.ytbe.configuration.security.token;

public interface AccessToken {

    String getRoles();

    Integer getId();

    String getSubject();

}
