package wecare.wecare.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "appointment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentid;

    @Column(nullable = false)
    private int userid;

    @Column(nullable = false)
    private int coachid;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int status; // e.g., 0 = pending, 1 = confirmed, 2 = cancelled

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalTime starthr;

    @Column(nullable = false)
    private LocalTime endhr;


}
