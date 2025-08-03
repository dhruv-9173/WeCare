package wecare.wecare.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.CoachProfile;
import wecare.wecare.Entity.appointment;
import wecare.wecare.repo.AppointmentsRepo;
import wecare.wecare.repo.CoachProfileRepo;
import wecare.wecare.services.CoachService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class CoachServiceImpl implements CoachService {

    @Autowired
    private CoachProfileRepo repo1;
    private final ModelMapper mapper = new ModelMapper();
    @Autowired
    private AppointmentsRepo repo2;

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
    public List<appointmentDTO> getAppointments(int userid) {
        try{

            List<appointment> result = repo2.findAllById(Collections.singleton(userid));
            List<appointmentDTO> appointmentDTOs = new ArrayList<>();
            mapper.map(result,appointmentDTOs);
            if(result != null){
                return appointmentDTOs;
            }
            else return null;
        }
        catch(Exception e) {
            return null;
        }
    }


}
