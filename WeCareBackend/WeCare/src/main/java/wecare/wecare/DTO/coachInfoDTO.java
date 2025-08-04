package wecare.wecare.DTO;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class coachInfoDTO {

    private int coachid;

    private String name;

    private LocalDate dob;

    private String mobilenumber;

    private String speciality;

    private String gender;
}