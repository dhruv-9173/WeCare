package wecare.wecare.io;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequest {
    @NotNull
    private String userid;
    @NotNull
    private String coachid;
    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime starthr;
    @NotNull
    private LocalTime endhr;
    private String description;

}
