package com.james.api.user.model;
import com.james.api.article.model.Article;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String age;
    private String email;
    private String address;
    private String phone;
    private String asset;
    private String mbti;
    private String InvestmentPropensity;
    private String job;
    private String regDate;
    private String modDate;
    private String token;
    private List<Article> articles;

}