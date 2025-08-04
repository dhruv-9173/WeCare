package wecare.wecare.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class userInfoDTO {

    private int userid;
    private String name;
    private String email;
    private String mobilenumber;
    private LocalDate dob;
    private String gender;
    private String country;
    private String city;
    private String state;
    private String pincode;

}
