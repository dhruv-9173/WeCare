package wecare.wecare.io;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CoachRegisterRequest {

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull(message = "Date of birth is required")
    private Date dob;

    @NotNull(message = "Mobile number is required")
    private String mobilenumber;

    @NotNull(message = "Speciality is required")
    private String speciality;

    @NotNull(message = "Gender is required")
    private String gender;
}
