package tnut.blogback.model.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LargeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "largeCategory_id")
    private Long id;

    private String largeCategoryName;

    @OneToMany(mappedBy = "largeCategory", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE) //largeCategory가 연관관계의 주인이며 largeCategory가 지워지면 subCateory도 지워짐
    @JsonIgnoreProperties("largeCategory")
    @OrderBy("id asc") //먼저 만든게 앞에 옴
    private List<SubCategory> subCategories = new ArrayList<>();
}
