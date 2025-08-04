package wecare.wecare.services.impl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.userInfoDTO;
import wecare.wecare.Entity.CoachProfile;
import wecare.wecare.io.UserInfoResponse;
import wecare.wecare.repo.CoachProfileRepo;
import wecare.wecare.repo.UserRepo;
import wecare.wecare.services.CoachService;


@Service
public class CoachServiceImpl implements CoachService {

    @Autowired
    private CoachProfileRepo repo1;
    private final ModelMapper mapper = new ModelMapper();
    @Autowired
    private UserRepo repo2;

    @Override
    public CoachProfileDTO getCoachProfile(int userid) {
       try{
           CoachProfileDTO profile = new CoachProfileDTO();
           CoachProfile coachProfile = repo1.getReferenceById(userid);
           mapper.map(coachProfile,profile);
           return profile;
       }
       catch(Exception e) {
           return null;
       }
    }

    @Override
    public Boolean updateCoachProfile(CoachProfileDTO coachProfile) {
        try {
            CoachProfile profile = new CoachProfile();
            mapper.map(coachProfile,profile);
            repo1.save(profile);
            return true;
        }
        catch(Exception e) {
            return false;
        }

    }

    @Override
    public UserInfoResponse getUserNameAndMobileNumber(int userid) {
        userInfoDTO userdto=repo2.getNameAndMobileNumberAndUseridByUserid(userid);
        return new UserInfoResponse().builder()
                .userid(userdto.getUserid())
                .mobileNumber(userdto.getMobilenumber())
                .name(userdto.getName())
                .build();
    }


}
