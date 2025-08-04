package wecare.wecare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "coachprofile")
public class CoachProfile {

    @Id
    private int userid;

    @Column
    private byte[] image;

    @Column
    private String description;

    @Column
    private String workingdays;

    @Column(name = "starthrs")
    private LocalTime start;

    @Column(name = "endhrs")
    private LocalTime end;

    @Column
    private String address;

    @Column
    private double rating;

    @Column
    private int totalappointments;
}