package com.james.api.board.service;
import com.james.api.article.model.Article;
import com.james.api.board.model.Board;
import com.james.api.board.model.BoardDto;
import com.james.api.common.service.CommandService;
import com.james.api.common.service.QueryService;

import java.util.Optional;

public interface BoardService extends CommandService<BoardDto>, QueryService<BoardDto> {

    //dto를 엔티티로 바꾸는것 -> 여기서 엔티티는 Article (@Entitiy 선언한 클래스)
    default Board dtoToEntity(BoardDto dto){

        return Board.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }
    // 엔티티를 dto로 바꾸는것
    default BoardDto entityToDto(Board ent){

        return BoardDto.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .description(ent.getDescription())
                .regDate(ent.getRegDate().toString())
                .modDate(ent.getModDate().toString())
                .build();
    }
}
