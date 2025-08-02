package wecare.wecare.services;

import wecare.wecare.DTO.UsersDTO;
import wecare.wecare.DTO.coachInfoDTO;
import wecare.wecare.DTO.userInfoDTO;
import wecare.wecare.io.AccountRegisterResponse;


public interface RegisterService {


    AccountRegisterResponse registerAccount(UsersDTO user);
    Boolean registerUserInfo(userInfoDTO user);
    Boolean registerCoachInfo(coachInfoDTO coach);
}
