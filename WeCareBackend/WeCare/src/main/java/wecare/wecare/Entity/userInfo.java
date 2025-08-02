package wecare.wecare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
@Builder
public class userInfo {

    @Id
    private int userid;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String mobilenumber;
    @Column
    private Date dob;
    @Column
    private String gender;
    @Column
    private String country;
    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String pincode;

}
