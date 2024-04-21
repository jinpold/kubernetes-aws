package com.james.api.user;
import com.james.api.common.component.Messenger;
import com.james.api.user.model.User;
import com.james.api.user.model.UserDto;
import com.james.api.user.repository.UserRepository;
import com.james.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;
import java.util.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping(path = "/api/users")
@Slf4j
public class UserController {
    private final UserService service;
    private final UserRepository repo;

    // ---------------------------------Command---------------------------------------
    @SuppressWarnings("static-access")
    @PostMapping( "/save")
    public ResponseEntity<Messenger> save(@RequestBody UserDto dto) {
        log.info("입력받은 정보 : {}", dto );
        return ResponseEntity.ok(service.save(dto));

    }
    // -----------------------------------Query ---------------------------------------

    @PostMapping(path = "/login")
    public ResponseEntity<Messenger> login(@RequestBody UserDto dto) {
        log.info("입력받은 정보 : {}", dto);
        return ResponseEntity.ok(service.login(UserDto.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build()));
    }
    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> findAll() throws SQLException {
        log.info("입력받은 정보 : {}");
        System.out.println(service.findAll());
        return ResponseEntity.ok(service.findAll());
    }
    @GetMapping("/detail")
    public ResponseEntity<UserDto> findById(@RequestParam Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.findById(id).orElseGet(UserDto::new));
    }
    @PutMapping ("/modify")
    public ResponseEntity<Messenger> modify(@RequestBody UserDto dto) {
        log.info("입력받은 정보 : {}", dto );
        return ResponseEntity.ok(service.modify(dto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Messenger> deleteById(@PathVariable Long id) {
        log.info("입력받은 정보 : {}", id );
        return ResponseEntity.ok(service.deleteById(id));
    }
    @GetMapping("/exists-id")
    public ResponseEntity<UserDto> existsById(@RequestParam Long id){
        service.existsById(0L);
        return ResponseEntity.ok(service.findById(id).orElseGet(UserDto::new));
    }
    @GetMapping("/count")
    public ResponseEntity<Long> count()  {
        return ResponseEntity.ok(service.count());
    }

    @PostMapping("/search-name")
    public ResponseEntity<Optional<User>> findUsersByName(@RequestBody UserDto param) {
        //log.info("입력받은 정보 : {}", name );
        return ResponseEntity.ok(service.findUserByUsername(param.getName()));
    }
    @GetMapping("/search-job")
    public ResponseEntity<Messenger> findUsersByJob(@RequestParam("job") String job) {
        service.findUsersByJob(job);
        return ResponseEntity.ok(new Messenger());
    }
    @GetMapping("/exists-username")
    public ResponseEntity<Boolean> existsByUsername(@RequestParam("username") String username) {
        log.info("existsByUsername 파라미터 정보:"+username);
        boolean flag = service.existsByUsername(username);
        log.info("existsByUsername 결과:" + username);
        return ResponseEntity.ok(flag);
    }
}
