package com.james.api.article;
import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.article.repository.ArticleRepository;
import com.james.api.article.service.ArticleService;
import com.james.api.article.service.ArticleServiceImpl;
import com.james.api.board.repository.BoardRepository;
import com.james.api.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@TestPropertySource(locations = "classpath:junit-platform.yml")
public class ArticleServiceImplTest {

    private ArticleService service;
    private static Article testArticle;
    @Mock
    private ArticleRepository repository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private BoardRepository boardRepository;
    @BeforeEach
    void setup() {
        this.service = new ArticleServiceImpl(repository, boardRepository, userRepository);
    }

    @BeforeEach
    public void init(){
        testArticle = Article.of("테스트제목", "테스트글");
    }
    @Test
    public void 게시글_제목_검색(){
        //Given
        repository.save(testArticle);

        // When
        Article article = repository.findById(1L).get();

        // Then
        assertThat(article.getTitle()).isEqualTo("테스트제목");
    }
    @Test
    public void 게시글_전체_검색() throws SQLException {
        List<Article> articles = getList();
        BDDMockito.given(repository.findAll()).willReturn(articles);
        List<ArticleDto> list = service.findAll();
        assertThat(list.size()).isEqualTo(3);
    }

    private List<Article> getList() {
        return Arrays.asList(
                Article.builder().id(1l).title("유관순").content("유관순은 3.1운동의 주역이였다").build(),
                Article.builder().id(2l).title("김구").content("김구는 임시정부의 주역이였다").build(),
                Article.builder().id(3l).title("윤봉길").content("윤봉길은 독립운동가이다").build()
        );
    }
}
