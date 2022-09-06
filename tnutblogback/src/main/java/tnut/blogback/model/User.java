
package tnut.blogback.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class User { //유저에 담길 내용: 유저네임, 비밀번호, 이메일, -> Oauth로 받아올 거임

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String provider;

    @JsonIgnore
    private String providerId;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id desc") //최신 댓글 순으로 정렬
    @JsonIgnoreProperties({"subReplies"})
    private List<Reply> replies = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @CreationTimestamp
    private Timestamp createDate;
}

