package wecare.wecare.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "coaches")
public class coach {
    @Id
    private int coachid;
    @Column
    private String name;
    @Column
    private String password;
    @Column
    private Date dob;
    @Column
    private String mobilenumber;
    @Column
    private String speciality;
    @Column
    private String gender;
}
