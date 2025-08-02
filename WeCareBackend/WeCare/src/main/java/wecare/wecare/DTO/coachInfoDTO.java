package wecare.wecare.DTO;

import lombok.*;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class coachInfoDTO {

    private int coachid;

    private String name;

    private Date dob;

    private String mobilenumber;

    private String speciality;

    private String gender;
}