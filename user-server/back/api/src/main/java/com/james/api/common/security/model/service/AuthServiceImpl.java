package com.james.api.common.security.model.service;
import com.james.api.common.component.Messenger;
import com.james.api.user.model.UserDto;
import com.james.api.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Log4j2
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository repository;


    @Override
    public Messenger login(UserDto dto) {

        boolean flag = repository.findUserByUsername
                (dto.getUsername()).get().getPassword().equals(dto.getPassword());

        return Messenger.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .token(flag ? createToken(dto) : "NONE")
                .build();
    }
    @Override
    public String createToken(UserDto user) {
        Claims claims = (Claims) Jwts.claims();
        claims.put("username", user.getUsername());

//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime tokenValidTime = now.plusSeconds(24*60*60*1000); //유효시간

        String token = Jwts.builder()
                .claims()
                .add("iss", "james.co.kr")
                .add("sub", "user Auth")
//                .add("exp", tokenValidTime)
                .add("userId", user.getId())
                .add("username", user.getUsername())
                .add("job", "admin") // 관리자(ad), 소비자
                .and()
                .compact();
        log.info("로그인 성공으로 발급된 토큰 : " + token);
        return token;
    }
}
