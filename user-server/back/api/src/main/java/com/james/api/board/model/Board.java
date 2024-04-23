package com.james.api.board.model;
import com.james.api.article.model.Article;
import com.james.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString(exclude = {"article", "id"})
@Entity(name="boards")

public class Board extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @OneToMany(mappedBy = "board" , fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Article> article;
    @Builder(builderMethodName = "builder")
    public Board(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
