package wecare.wecare.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class appointmentDTO {

    private int appointmentid;
    private int userid;
    private int coachid;
    private LocalDate date;
    private LocalTime starthr;
    private LocalTime endhr;
    private String description;
    private int status;
}
