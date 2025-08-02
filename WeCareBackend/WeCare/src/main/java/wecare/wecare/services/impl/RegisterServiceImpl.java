package wecare.wecare.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import wecare.wecare.DTO.UsersDTO;
import wecare.wecare.DTO.coachInfoDTO;
import wecare.wecare.DTO.userInfoDTO;
import wecare.wecare.Entity.coachInfo;
import wecare.wecare.Entity.userInfo;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import wecare.wecare.Entity.users;
import wecare.wecare.io.AccountRegisterResponse;
import wecare.wecare.repo.AccountsRepo;
import wecare.wecare.repo.CoachRepo;
import wecare.wecare.repo.UserRepo;
import wecare.wecare.services.RegisterService;

@Service

public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserRepo repo1;
    @Autowired
    private CoachRepo repo2;
    @Autowired
    private AccountsRepo repo3;
    private final ModelMapper mapper=new ModelMapper();
    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    @Override
    public Boolean registerUserInfo(userInfoDTO userdto) {
        userInfo newUser = new userInfo();
        mapper.map(userdto,newUser);
        try {
            repo1.save(newUser);
            return true;
        }
        catch (Exception e) {
            System.out.println( e.getMessage() );
            return false;
        }

    }

    @Override
    public Boolean registerCoachInfo(coachInfoDTO coach) {
        coachInfo newCoach = new coachInfo();
        mapper.map(coach,newCoach);
        try {
            repo2.save(newCoach);
            return true;
        }
        catch (Exception e) {
            System.out.println( e.getMessage() );
            return false;
        }
    }


    @Override
    public AccountRegisterResponse registerAccount(UsersDTO user) {
        users newUser = new users();
        mapper.map(user,newUser);
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        try{
            users addedUser = repo3.save(newUser);
            AccountRegisterResponse response= new AccountRegisterResponse();
            mapper.map(addedUser,response);
            return response;
        }
        catch (Exception e) {
            System.out.println( e.getMessage() );
            return null;
        }
    }


}
