package com.james.api.article.service;
import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.article.repository.ArticleRepository;
import com.james.api.board.repository.BoardRepository;
import com.james.api.common.component.Messenger;
import com.james.api.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final BoardRepository boardRepository;
    @Override
    public Messenger save(ArticleDto t) {
        Article ent = articleRepository.save(dtoToEntity(t));
        return Messenger.builder()
                .message(ent instanceof Article ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public Messenger deleteById(Long id) {
        articleRepository.deleteById(id);
        return Messenger.builder()
                .message(articleRepository.findById(id).isPresent() ? "SUCCESS" : "FAILURE")
                .build();
    }
    @Transactional
    @Override
    public Messenger modify(ArticleDto dto) {
        articleRepository.save(dtoToEntity(dto));
        return Messenger.builder()
                .message("성공")
                .build();
    }
    @Override
    public List<ArticleDto> findAll() throws SQLException {
        return articleRepository.findAll().stream().map(i -> entityToDto(i)).toList();
    }
    @Override
    public Optional<ArticleDto> findById(Long id) {
        return articleRepository.findById(id).stream().map(i -> entityToDto(i)).findAny();
    }
    @Override
    public Long count() {
        return articleRepository.count();
    }
    @Override
    public boolean existsById(Long id) {
        return articleRepository.existsById(id);
    }
    @Override
    public List<ArticleDto> getArticleByBoardId(Long boardId) {
        return articleRepository.getArticleByBoardId(boardId)
                .stream().map(i -> entityToDto(i))
                .toList();
    }
    @Override
    public List<ArticleDto> findArticlesByTitle(String name) {
        return articleRepository.findArticlesByTitle(name);
    }
}
