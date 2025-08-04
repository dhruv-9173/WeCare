package wecare.wecare.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "coaches")
public class coachInfo {
    @Id
    private int coachid;
    @Column
    private String name;
    @Column
    private LocalDate dob;
    @Column
    private String mobilenumber;
    @Column
    private String speciality;
    @Column
    private String gender;
}
