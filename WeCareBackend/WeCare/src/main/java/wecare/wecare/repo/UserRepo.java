package wecare.wecare.repo;

import wecare.wecare.DTO.userInfoDTO;
import wecare.wecare.Entity.userInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import wecare.wecare.io.UserInfoResponse;

public interface UserRepo extends JpaRepository<userInfo, Integer> {

    userInfo getByuserid(int userid);

    userInfoDTO getNameAndMobileNumberAndUseridByUserid(int userid);
}
