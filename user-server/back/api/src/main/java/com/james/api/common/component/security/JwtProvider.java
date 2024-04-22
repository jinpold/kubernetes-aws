package com.james.api.common.component.security;
import com.james.api.user.model.UserDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Log4j2
@Component
public class JwtProvider {
    Instant expiredDate = Instant.now().plus(1, ChronoUnit.DAYS);

    @Value("${jwt.iss}")
    private String issuer;

    private final SecretKey secretKey;
    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretKey));
    }
    public String createToken(UserDto dto) {

        String accessToken = Jwts.builder()
                .issuer(issuer)
                .signWith(secretKey)
                .expiration(Date.from(expiredDate))
                .claim("sub", "james")
                .claim("username", dto.getUsername())
                .claim("job", dto.getJob())  // 관리자(ad), 소비자
                .claim("userId", dto.getId())
                .compact();

        log.info("로그인 성공으로 발급된 토큰 : " + accessToken);
        return accessToken;
    }

    public String extractTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if(bearerToken != null && bearerToken.startsWith("Bearer")){
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getPayload(String accessToken) {
        String[] chunks = accessToken.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        log.info("accessToken Header :" +header);
        log.info("accessToken Header :" +payload);

//        return new StringBuilder().append(header).append(payload).toString();
        return payload;
    }
}
