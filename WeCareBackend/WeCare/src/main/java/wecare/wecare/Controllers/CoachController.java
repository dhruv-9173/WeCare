package wecare.wecare.Controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.io.cancelAppointments;
import wecare.wecare.io.updateCoachProfileRequest;
import wecare.wecare.services.CoachService;

import java.util.List;

@RestController
@RequestMapping("/coach")
public class CoachController {

    @Autowired
    private CoachService coachService;
    private ModelMapper modelMapper = new ModelMapper();

    @GetMapping("/getProfile")
    public ResponseEntity<CoachProfileDTO> handlegetProfile() {
            try{
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                int userid = Integer.parseInt(authentication.getName());
                CoachProfileDTO profileDTO= coachService.getCoachProfile(userid);
                if(profileDTO!=null){
                    return new ResponseEntity<>(profileDTO, HttpStatus.OK);
                }
                return new ResponseEntity<CoachProfileDTO>(HttpStatus.NOT_FOUND);
            }
            catch(Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<Boolean> handleupdateProfile(@RequestBody updateCoachProfileRequest request) {

        try{
            CoachProfileDTO coachProfile = modelMapper.map(request, CoachProfileDTO.class);
            if(coachService.updateCoachProfile(coachProfile))
                return ResponseEntity.status(HttpStatus.OK).body(true);
            else return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
        }

        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getAppointments")
    public ResponseEntity<List<appointmentDTO>> handlegetAppointments() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            int userid = Integer.parseInt(authentication.getName());
            List<appointmentDTO>result = coachService.getAppointments(userid);
            if(result!=null){
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/cancelAppointments")
    public ResponseEntity<appointmentDTO> handlecancelAppointments(@RequestBody cancelAppointments request) {
        return ResponseEntity.ofNullable(null);
    }



}
