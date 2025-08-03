package wecare.wecare.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class updateCoachProfileRequest {

    private int userid;
    private byte[] image;
    private String description;
    private String workingdays;
    private LocalTime start;
    private LocalTime end;
    private String Address;
    private String sessiontime;

}
