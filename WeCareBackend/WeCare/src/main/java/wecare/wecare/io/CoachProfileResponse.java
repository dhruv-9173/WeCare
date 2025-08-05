package wecare.wecare.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CoachProfileResponse {

        private int userid;
        private String name;
        private String mobilenumber;
        private String image;
        private String speciality;
        private String description;
        private String workingdays;
        private LocalTime start;
        private LocalTime end;
        private String address;
        private double rating;
        private int totalappointments;

}
