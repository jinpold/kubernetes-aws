package com.james.api.user.service;
import com.james.api.common.component.security.JwtProvider;
import com.james.api.common.component.Messenger;
import com.james.api.user.model.User;
import com.james.api.user.model.UserDto;
import com.james.api.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    @Override
    public Messenger save(UserDto t) {
        User ent = userRepository.save(dtoToEntity(t));
        System.out.println((ent instanceof User) ? "SUCCESS" : "FAILURE");
        return Messenger.builder()
                .message((ent instanceof User) ? "SUCCESS" : "FAILURE")
                .build();
    }
    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(i->entityToDto(i)).toList();
    }
    @Override
    public Optional<UserDto> findById(Long id) {
        return userRepository.findById(id).stream().map(i -> entityToDto(i)).findAny();
    }

    @Transactional
    @Override
    public Messenger modify(UserDto userDto) {
        userRepository.save(dtoToEntity(userDto));
        return Messenger.builder()
                .message("SUCCESS")
                .build();
    }

    @Override
    public Messenger deleteById(Long id) {
        userRepository.deleteById(id);
        return Messenger.builder().message
                (Stream.of(id)
                        .filter(i -> existsById(i))
                        .peek(i -> userRepository.deleteById(i))
                        .map(i -> "SUCCESS")
                        .findAny()
                        .orElseGet(()->"FAILURE")).build();
    }
    @Override
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public Long count() {
        return userRepository.count();
    }

    // SRP에 따라 아이디 존재여부를 프론트에서 먼저 판단하고, 넘어옴 (시큐리티)
    @Transactional
    @Override
    public Messenger login(UserDto dto) {
        log.info("로그인 서비스로 들어온 파라미터 : " +dto);
        User user = userRepository.findUserByUsername((dto.getUsername())).get();
        String accessToken = jwtProvider.createToken(entityToDto(user));

        boolean flag = user.getPassword().equals(dto.getPassword());
        log.info("accessToken 확인용: "+accessToken);
        userRepository.modifyTokenById(user.getId(), accessToken);
        // 토큰을 각 섹션 (Header, payload, signature)으로 분할

        jwtProvider.printPayload(accessToken);
        return Messenger.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? accessToken : "NONE")
                .build();
    }

    @Override
    public Optional<User> findUsersByJob(String job) {
        return userRepository.findUsersByJob(job);
    }

    @Override
    public Boolean existsByUsername(String username) {
        Integer count  = userRepository.existsByUsername(username);
        return count ==1;
    }
    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
    @Transactional
    @Override
    public Boolean logout(String token) {
        String accessToken = token != null && token.startsWith("Bearer ") ?
                token.substring(7) : "undefined";
        Long id = jwtProvider.getPayload(accessToken).get("userId", Long.class);
        String deleteToken = "";
        userRepository.modifyTokenById(id,deleteToken);
        return userRepository.findById(id).get().getToken().equals("");
    }

    @Override
    public Optional<UserDto> findUserInfo(String accessToken) {
        String splitToken = accessToken.substring(7);
        Long id = jwtProvider.getPayload(splitToken).get("id", Long.class);

        return Optional.of(entityToDto(userRepository.findById(id).orElseThrow()));
    }

}
