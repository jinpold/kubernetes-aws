package com.james.api.common.config;
import com.james.api.common.component.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvConfig implements WebMvcConfigurer { // 어플리케이션 컨텍스트가 제일 먼저 체크

    private final AuthInterceptor authInterceptor; // 인터셉터 등록해서 사용
    @Override
    public void addInterceptors(@SuppressWarnings("null") InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/**"); //auth를 갖고 있으면 토큰이 없어도 통과시켜준다.
                                                      //로그인 해야 토큰을 주는데 토큰이 없는 경우 auth가 있으면 통과
                                                      //아이디가 존재하는지 찾는 로직과 , 최초 로그인 로직은 토큰이 없음.
    }
}
