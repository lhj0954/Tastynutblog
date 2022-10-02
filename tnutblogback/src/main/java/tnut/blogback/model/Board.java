package tnut.blogback.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import tnut.blogback.model.category.SubCategory;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Board { // 보드에 담길 내용: 제목, 내용, 댓글, (글은 나만 쓸 것이므로 유저정보는 필요 없음)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name = "subCategory_id")
    private SubCategory subCategory;

    @Builder.Default
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id asc") //일단은 먼저쓴 댓글이 가장 위로 보이게, 후에 추천순, 비추순 등등 다양한 order기준을 넣을 예정
    private List<Reply> replies = new ArrayList<>();

    @CreationTimestamp
    private Timestamp createDate;

    public Board(SubCategory subCategory, String title, String content) {
        this.subCategory = subCategory;
        this.title = title;
        this.content = content;
    }
}
