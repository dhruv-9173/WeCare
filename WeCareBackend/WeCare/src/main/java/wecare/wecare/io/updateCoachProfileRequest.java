package wecare.wecare.io;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class updateCoachProfileRequest {

    @NotNull(message = "CoachId must be provided")
    private int userid;
    @NotNull
    private String coachname;
    @NotNull
    private String mobilenumber;
    private String image;
    private String speciality;
    private String description;
    private String workingdays;
    private LocalTime start;
    private LocalTime end;
    private String Address;


}
