package wecare.wecare.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="accounts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class users {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int userid;
    @Column
    private String password;
    @Column
    private String role;
}
