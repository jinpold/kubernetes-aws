package com.james.api.article.service;
import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.article.repository.ArticleRepository;
import com.james.api.board.model.Board;
import com.james.api.board.repository.BoardRepository;
import com.james.api.common.component.Messenger;
import com.james.api.user.model.User;
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
    private final UserRepository userRepository;

    @Transactional
    @Override
    public Messenger save(ArticleDto articleDto) {
        Board board = boardRepository.findById(articleDto.getBoardId()).orElseThrow();
        User user = userRepository.findById(articleDto.getWriterId()).orElseThrow();
        Article article = articleRepository.save(dtoToEntity(articleDto, board, user));

        return Messenger.builder()
                .id(article.getBoard().getId()) //board id
                .message(article instanceof Article ? "SUCCESS" : "FAILURE")
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
    public Messenger modify(ArticleDto articleDto) {
        Optional<Article> article = articleRepository.findById(articleDto.getId());

        if (article.isEmpty()) {
            return Messenger.builder()
                    .message("FAILURE")
                    .build();
        }

        article.get().setTitle(articleDto.getTitle());
        article.get().setContent(articleDto.getContent());
        articleRepository.save(article.get());
        return Messenger.builder()
                .message("SUCCESS")
                .build();

    }

//        articleRepository.save(dtoToEntity(dto, boardRepository, userRepository));
//        return Messenger.builder()
//                .message("성공")
//                .build();

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
}
