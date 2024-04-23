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

//        String token = jwtProvider.extractTokenFromHeader(request);  //1번
//        log.info("1- 인터셉터 토큰 로그 Bearer 포함: {}" , token);
//
//        if(token.equals("undefined")){   // 2번
//            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
//            return false;
//        }
//
//        Long id = jwtProvider.getPayload(token).get("userId",Long.class); //3번
//        // .get() 메모리가 아닌 클래스내 클레임에서 가져올때사용
//        log.info("2- 인터셉터 사용자 id : {}" , id);
//
//
//        Optional<User> user = userRepository.findById(id); //4번
//        log.info("3- 인터셉터 사용자 정보 : {}" , user);
//
//        if(!user.isPresent()){ //5번
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//            return false;
//        }
//
//        log.info("4- 인터셉터 최종 여부  : {}" , true);


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

//              // 토큰이 없으면 false
//              if(ObjectUtils.isEmpty(token)){
//                  response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//                  return false;
//              }
//
//              // 토큰이 있을때 findById 기준으로 id를 찾는다.
//              // 토큰이 있을때 아이디가 없으면 false (잘못된 아이디이거나 정보가 다른 경우 또는 아이디가 없을경우)
//              String strId = jwtProvider.getPayload(token);
//              Long id = Long.parseLong(strId);

//              if(ObjectUtils.isEmpty(user)){
//                  response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//                  return false;
//              }



    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
