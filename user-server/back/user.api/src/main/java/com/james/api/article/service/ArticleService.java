package com.james.api.article.service;
import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.board.model.Board;
import com.james.api.common.service.CommandService;
import com.james.api.common.service.QueryService;
import com.james.api.user.model.User;
import java.util.*;

public interface ArticleService extends CommandService<ArticleDto>, QueryService<ArticleDto> {

    List<ArticleDto> getArticleByBoardId(Long id);

    default Article dtoToEntity(ArticleDto dto, Board board, User user) {
        return Article.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(user)
                .board(board)
//                .writer(userRepository.findById(dto.getBoardId()).orElse(null))
//                .board(boardRepository.findById(dto.getBoardId()).orElse(null))
                .build();
    }
    default ArticleDto entityToDto(Article ent) {

        return ArticleDto.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .content(ent.getContent())
                .writerId(ent.getWriter().getId())
                .boardId(ent.getBoard().getId())
                .regDate(String.valueOf(ent.getModDate()))
                .modDate(String.valueOf(ent.getRegDate()))
                .build();
    }
}
