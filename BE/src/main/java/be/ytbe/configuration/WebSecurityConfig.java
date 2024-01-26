package be.ytbe.configuration;

import be.ytbe.configuration.security.auth.AuthenticationRequestFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true)
@Configuration
public class WebSecurityConfig {
    private static final String[] SWAGGER_UI_RESOURCES = {
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/swagger-ui/**"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity,
                                           AuthenticationEntryPoint authenticationEntryPoint,
                                           AuthenticationRequestFilter authenticationRequestFilter) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(configurer ->
                        configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(registry ->
                                registry.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                        .requestMatchers("/ws/**", "/oauth2", "/oauth2/**").permitAll()
                                        .requestMatchers(HttpMethod.POST, "/**").permitAll()// Creating a user and login are public
                                        .requestMatchers(HttpMethod.GET, "/**").permitAll()//PermitAll() removes security checks, if you want a specific http method to be authenticated, you replace it with authenticated()
                                        .requestMatchers(SWAGGER_UI_RESOURCES).permitAll()// Swagger is also public (In "real life" it would only be public in non-production environments)
                                        .anyRequest().authenticated()

                        // Everything else --> authentication required, which is Spring security's default behaviour

                )

                .exceptionHandling(configure -> configure.authenticationEntryPoint(authenticationEntryPoint))
                .addFilterBefore(authenticationRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();

    }


}
