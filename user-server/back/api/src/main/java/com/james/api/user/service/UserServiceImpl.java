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

    private final UserRepository repository;
    private final JwtProvider jwtProvider;

    @Override
    public Messenger save(UserDto t) {
        User ent = repository.save(dtoToEntity(t));
        System.out.println((ent instanceof User) ? "SUCCESS" : "FAILURE");
        return Messenger.builder()
                .message((ent instanceof User) ? "SUCCESS" : "FAILURE")
                .build();
    }
    @Override
    public List<UserDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }
    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).stream().map(i -> entityToDto(i)).findAny();
    }
    @Transactional
    @Override
    public Messenger modify(UserDto userDto) {
        repository.save(dtoToEntity(userDto));
        return Messenger.builder()
                .message("성공")
                .status(200)
                .build();
    }
    //    @Override
//    public Optional<UserDto> modify(UserDto userDto) {
//        Optional<User> user = repository.findById(userDto.getId());
//        user.get().setName(userDto.getName());
//        user.get().setPhone(userDto.getPhone());
//        user.get().setJob(userDto.getJob());
//        user.get().setUsername(userDto.getUsername());
//        return Optional.of(repository.save(user.get())).map(i -> entityToDto(i));
//    }

    @Transactional
    @Override
    public Messenger deleteById(Long id) {
        repository.deleteById(id);
        return Messenger.builder().message
                (Stream.of(id)
                        .filter(i -> existsById(i))
                        .peek(i -> repository.deleteById(i))
                        .map(i -> "SUCCESS")
                        .findAny()
                        .orElseGet(()->"FAILURE")).build();
    }
    @Override
    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Long count() {
        return repository.count();
    }

//    @Override
//    public Messenger count() {
//        return Messenger.builder()
//                .message(repository.count()+"")
//                .build();
//                }

    // SRP에 따라 아이디 존재여부를 프론트에서 먼저 판단하고, 넘어옴 (시큐리티)
    @Transactional
    @Override
    public Messenger login(UserDto dto) {
        log.info("로그인 서비스로 들어온 파라미터 : "+dto);
        User user = repository.findUserByUsername((dto.getUsername())).get();
        String accessToken = jwtProvider.createToken(entityToDto(user));
        boolean flag = user.getPassword().equals(dto.getPassword());

        // 토큰을 각 섹션 (Header, payload, signature)으로 분할
        jwtProvider.printPayload(accessToken);


        return Messenger.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? accessToken : "NONE")
                .build();
    }


    //    @Override
//    public Messenger login(UserDto dto) {
//        return Messenger.builder()
//                .message(findUserByUsername(dto.getUsername())
//                        .stream()
//                        .filter(i -> i.getPassword().equals(dto.getPassword()))
//                        .map(i -> "SUCCESS")
//                        .findAny()
//                        .orElseGet(()-> "FAILURE")).build();
//    }

    @Override
    public Optional<User> findUsersByJob(String job) {
        return repository.findUsersByJob(job);
    }

    @Override
    public Boolean existsByUsername(String username) {
        Integer count  = repository.existsByUsername(username);
        return count ==1;
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repository.findUserByUsername(username);
        //        User user = repository.findByUsername(username);
//        return Optional.of(entityToDto(user));
    }

    @Override
    public Boolean logout(Long id) {
        return null;
    }
}
