package com.james.api.board.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.james.api.board.model.Board;

import java.util.List;

@Repository
public interface BoardRepository  extends JpaRepository<Board, Long>{

    List<Board> getAllByOrderByContentDesc();

}