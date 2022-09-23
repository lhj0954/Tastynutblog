package tnut.blogback.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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
public class Reply { //댓글에 담길 내용: 닉네임(유저), 댓글 내용, 대댓글, 해당 게시글

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    @Column(columnDefinition = "boolean default false")
    private boolean isDeletable;

    @ManyToOne
    @JoinColumn(name = "parentReply_id")
    private Reply parentReply;

    @OneToMany(mappedBy = "parentReply", fetch = FetchType.LAZY)
    @OrderBy("id asc ")
    private List<Reply> reReplies = new ArrayList<>();

    @ManyToOne //하나의 보드에 여러 댓글
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private Timestamp createDate;
}
