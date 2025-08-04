package wecare.wecare.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoachProfileDTO {

    private int userid;
    private byte[] image;
    private String description;
    private String workingdays;
    private LocalTime start;
    private LocalTime end;
    private String address;
    private double rating;
    private int totalAppointments;
}
