package com.james.api.article.service;
import com.james.api.article.model.Article;
import com.james.api.article.model.ArticleDto;
import com.james.api.board.model.Board;
import com.james.api.common.service.CommandService;
import com.james.api.common.service.QueryService;
import com.james.api.user.model.User;

import java.util.*;

public interface ArticleService extends CommandService<ArticleDto>, QueryService<ArticleDto> {

    List<ArticleDto> findAllByBoardId(Long id);

    default Article dtoToEntity(ArticleDto dto) {

        return Article.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(User.builder().id(dto.getWriterId()).build())
                .board(Board.builder().id(dto.getBoardId()).build())
                .build();
    }
    default ArticleDto entityToDto(Article ent) {

        return ArticleDto.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .content(ent.getContent())
                .writerId(ent.getWriter().getId())
                .boardId(ent.getBoard().getId())
                .regDate(ent.getRegDate().toString())
                .modDate(ent.getModDate().toString())
                .build();
    }
}
