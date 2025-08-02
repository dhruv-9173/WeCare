package wecare.wecare.repo;

import wecare.wecare.Entity.userInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<userInfo, Integer> {

    userInfo getByuserid(int userid);
}
