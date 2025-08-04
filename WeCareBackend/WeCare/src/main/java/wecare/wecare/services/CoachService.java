package wecare.wecare.services;

import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.io.UserInfoResponse;

import java.util.Collection;
import java.util.List;

public interface CoachService {

     CoachProfileDTO getCoachProfile(int userid);
     Boolean updateCoachProfile(CoachProfileDTO coachProfile);
     UserInfoResponse getUserNameAndMobileNumber(int userid);

}
