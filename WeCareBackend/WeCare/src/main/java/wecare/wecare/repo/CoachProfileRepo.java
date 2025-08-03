package wecare.wecare.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import wecare.wecare.Entity.CoachProfile;

import java.sql.Time;
import java.util.List;

public interface CoachProfileRepo extends JpaRepository<CoachProfile,Integer> {


    CoachProfile getByUserid(int coachid);
}
