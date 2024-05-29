package com.james.api.common.component.interceptor;
import com.james.api.common.component.security.JwtProvider;
import com.james.api.user.model.User;
import com.james.api.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {
    // 인터페이스 구현체는 인터셉터이고 서블릿 컨테이너 내부에 있음.
    // 인터셉터를 구현하면 자동적으로 서블릿에 자리 잡는다.

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception { // request

        return Stream.of(request)
                .map(i -> jwtProvider.extractTokenFromHeader(i))
                .filter(i -> !i.equals("undefined"))
                .peek(i-> log.info("1- 인터셉터 토큰 로그 Bearer 포함: {} " , i))
                .map(i -> jwtProvider.getPayload(i).get("userId",Long.class))
                .map(i -> userRepository.findById(i))
                .filter(i -> i.isPresent())
                .peek(i-> log.info("2- 인터셉터 사용자 id : {} ", i))
                .findFirst().isPresent();
    }


    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
