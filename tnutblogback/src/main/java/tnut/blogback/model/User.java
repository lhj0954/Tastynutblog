
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
public class User { //유저에 담길 내용: 유저네임, 비밀번호, 이메일, -> Oauth로 받아올 거임

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;

    private String username;

    private String password;

    private String email;

    private String provider;

    private String providerId;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id desc") //최신 댓글 순으로 정렬
    private List<Reply> replies = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @CreationTimestamp
    private Timestamp createDate;
}

