package com.james.api.article.repository;
import com.james.api.article.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // JPQL Default 방식
    @Query("select a "
            + "from articles a where a.board.id = :boardId ")
    List<Article> getArticleByBoardId(@Param("boardId") Long boardId);


    // Native 쿼리 방식 (비사용을 추천)
    @Query(value = "select + from articles a where a.board.id = 1 ", nativeQuery = true)
    List<Map<String, Object>> getQnaArticle(@Param("boardId") Long boardId);

//
//    // JPQL Return Type DTO
//    String articleDtoMapping = "new com.james.api.article.model.ArticleDto" +
//            "("+"a.id, a.title, a.content, a.writer.id, a.board.id " +
//            ", a.regData, a.modDate)";
//    @Query("select " + articleDtoMapping +
//            "from articles a where a.board.id = :boardId ")
//    List<Article> getArticleDTPsByBoardId(@Param("boardId") Long boardId);


}
