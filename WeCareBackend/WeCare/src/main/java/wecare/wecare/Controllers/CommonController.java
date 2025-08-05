package wecare.wecare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.CommentDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.DTO.userInfoDTO;
import wecare.wecare.io.CoachProfileResponse;
import wecare.wecare.services.AppointmentService;
import wecare.wecare.services.CoachService;
import wecare.wecare.services.UserService;

import java.util.Base64;
import java.util.List;

@RestController
public class CommonController {
    @Autowired
    private  UserService userService;
    @Autowired
    private CoachService coachService;
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/getComments")
    public ResponseEntity<List<CommentDTO>> handlegetComments(@RequestParam int coachid)
    {
        try{
            List<CommentDTO>list = userService.getAllComments(coachid);
            return ResponseEntity.ok(list);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getProfile")
    public ResponseEntity<?> handlegetProfile() {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            int userid = Integer.parseInt(authentication.getName());
            String role = authentication.getAuthorities().iterator().next().toString();

            if(role.equals("ROLE_COACH")) {
                try {

                    CoachProfileDTO profileDTO = coachService.getCoachProfile(userid);
                    CoachProfileResponse response = new CoachProfileResponse().builder()
                            .userid(userid)
                            .end(profileDTO.getEnd())
                            .name(profileDTO.getName())
                            .start(profileDTO.getStart())
                            .description(profileDTO.getDescription())
                            .address(profileDTO.getAddress())
                            .rating(profileDTO.getRating())
                            .mobilenumber(profileDTO.getMobilenumber())
                            .workingdays(profileDTO.getWorkingdays())
                            .totalappointments(profileDTO.getTotalappointments())
                            .speciality(profileDTO.getSpeciality())
                            .build();
                    if (profileDTO.getImage() != null) {
                        String base64Image = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(profileDTO.getImage());
                        response.setImage(base64Image);
                    }
                    if (response != null) {
                        return new ResponseEntity<>(response, HttpStatus.OK);
                    }
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else{
                try {
                    userInfoDTO profileDTO = userService.getUser(userid);
                    if (profileDTO != null) {
                        return new ResponseEntity<>(profileDTO, HttpStatus.OK);
                    }
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
    }

    @GetMapping("/getAppointments")
    public ResponseEntity<List<appointmentDTO>> handlegetAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userid = Integer.parseInt(authentication.getName());
        String role = authentication.getAuthorities().iterator().next().toString();
        if(role.equals("ROLE_COACH")) {
            try {
                List<appointmentDTO> result = appointmentService.getCoachAppointments(userid);
                if (result != null) {
                    return new ResponseEntity<>(result, HttpStatus.OK);
                } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else{
            try {
                List<appointmentDTO> result = appointmentService.getUserAppointments(userid);
                if (result != null) {
                    return new ResponseEntity<>(result, HttpStatus.OK);
                } else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
