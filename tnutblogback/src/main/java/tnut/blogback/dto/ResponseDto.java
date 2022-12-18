package tnut.blogback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto<T> { //controller로 부터 받은 데이터를 http상태와 함께 담음
    int status;
    T data;
}
