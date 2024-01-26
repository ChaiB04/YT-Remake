package be.ytbe.configuration.security.token.impl;
import be.ytbe.configuration.security.token.AccessToken;
import be.ytbe.configuration.security.token.AccessTokenEncoderDecoder;
import be.ytbe.configuration.security.token.exception.InvalidAccessTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class AccessTokenEncoderDecoderImpl implements AccessTokenEncoderDecoder {
    private final Key key;

    public AccessTokenEncoderDecoderImpl(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String encode(AccessToken accessToken) {
        Map<String, Object> claimsMap = new HashMap<>();

        if (accessToken.getRoles() != null) {
            claimsMap.put("roles", accessToken.getRoles());
        }
        if (accessToken.getId() != null) {
            claimsMap.put("id", accessToken.getId());
        }

//        if(accessToken.getSubject() != null){
//            claimsMap.put("subject", accessToken.getSubject());
//        }

        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(accessToken.getSubject())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(10, ChronoUnit.DAYS)))
                .addClaims(claimsMap)
                .signWith(key)
                .compact();
    }


    public AccessToken decode(String accessTokenEncoded) {
        try {
            Jwt<?, Claims> jwt = Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(accessTokenEncoded);
            Claims claims = jwt.getBody();

            String roles = claims.get("roles", String.class);
            Integer userId = claims.get("id", Integer.class);
//            String email = claims.get("subject", String.class);

            return new AccessTokenImpl(claims.getSubject(), userId, roles);
        } catch (JwtException e) {
            throw new InvalidAccessTokenException(e.getMessage());
        }
    }

}
