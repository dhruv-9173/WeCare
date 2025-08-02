package wecare.wecare.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class coachDTO {

    private int coachid;

    private String name;

    private String password;

    private Date dob;

    private String mobilenumber;

    private String speciality;

    private String gender;
}