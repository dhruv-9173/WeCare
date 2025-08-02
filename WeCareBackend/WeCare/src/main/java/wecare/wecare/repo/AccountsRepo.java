package wecare.wecare.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import wecare.wecare.Entity.users;
import wecare.wecare.io.AccountRegisterResponse;

public interface AccountsRepo extends JpaRepository<users,Integer> {
    users findByUserid(int userid);



}
