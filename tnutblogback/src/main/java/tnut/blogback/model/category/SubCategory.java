package tnut.blogback.model.category;

import lombok.*;
import tnut.blogback.model.Board;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subCategoryName;

    @ManyToOne
    @JoinColumn(name = "largeCategory_id") //largeCategory_id를 참조해서 연관관계를 맺음
    private LargeCategory largeCategory;

    @OneToMany(mappedBy = "subCategory", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id desc")
    private List<Board> boards = new ArrayList<>();
}
