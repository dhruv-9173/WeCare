package wecare.wecare.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import wecare.wecare.Entity.coachInfo;

public interface CoachRepo extends JpaRepository<coachInfo,Integer> {
}
