package com.james.api.user.model;
import com.james.api.article.model.Article;
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
    private String phone;
    private String job;
    private List<Article> articles;
    private String regDate;
    private String modDate;
}