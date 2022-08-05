package tnut.blogback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
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
    @JsonIgnore
    @JoinColumn(name = "parentReply_id")
    private Reply parentReply;

    @OneToMany(mappedBy = "parentReply", fetch = FetchType.LAZY)
    @OrderBy("id asc ")
    private List<Reply> subReplies = new ArrayList<>();

    @ManyToOne //하나의 보드에 여러 댓글
    @JsonIgnore //댓글에선 보드의 정보가 필요 없음
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JsonIgnoreProperties(value = {"password", "email", "provider", "providerId", "roleType", "createDate"})
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private Timestamp createDate;
}
