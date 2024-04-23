package com.james.api.user;
import com.james.api.common.component.Messenger;
import com.james.api.user.model.UserDto;
import com.james.api.user.repository.UserRepository;
import com.james.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RequestMapping(path = "/api/auth")
@Slf4j
public class AuthController {
    private final UserService service;
    private final UserRepository userRepository;

    // -----------------------------------Query ---------------------------------------

    @PostMapping(path = "/login")
    public ResponseEntity<Messenger> login(@RequestBody UserDto dto) {
        log.info("입력받은 정보 : {}", dto);
        return ResponseEntity.ok(service.login(UserDto.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build()));
    }
    @GetMapping("/exists-username") //헤더 자리 params // 바디는  @RequestParam
    public ResponseEntity<Boolean> existsByUsername(@RequestParam("username") String username) {
        log.info("existsByUsername 파라미터 정보:"+username);
        log.info("existsByUsername 결과:" + username);
        return ResponseEntity.ok(service.existsByUsername(username));
    }
}
