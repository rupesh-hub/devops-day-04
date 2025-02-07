package com.alfarays.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class TokenService {

    @Value("${application.security.token.secret_key}")
    private String SECRET_KEY;

    @Value("${application.security.token.expiration}")
    private long EXPIRATION_TIME;

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        var authorities = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .claim("authorities", authorities)
                .signWith(signKey())
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        return (extractClaims(token, Claims::getExpiration))
                .before(new Date());
    }

    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token))
                && !isTokenExpired(token);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        return claimResolver.apply(
                Jwts
                        .parserBuilder()
                        .setSigningKey(signKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody()
        );
    }

    private Key signKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }
}