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
import wecare.wecare.io.updateCoachProfileRequest;
import wecare.wecare.services.AppointmentService;
import wecare.wecare.services.CoachService;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/coach")
public class CoachController {

    @Autowired
    private CoachService coachService;
    @Autowired
    private AppointmentService appointmentService;
    private final ModelMapper modelMapper = new ModelMapper();



    @PutMapping("/updateProfile")
    public ResponseEntity<Boolean> handleupdateProfile(@RequestBody updateCoachProfileRequest request) {

        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            int userid = Integer.parseInt(authentication.getName());
            request.setUserid(userid);
            byte[] imageBytes = null;
            if (request.getImage() != null && request.getImage().startsWith("data:image")) {
                String base64Image = request.getImage().split(",")[1];
                imageBytes = Base64.getDecoder().decode(base64Image);
            }
            CoachProfileDTO coachProfile = new CoachProfileDTO().builder()
                    .image(imageBytes)
                    .end(request.getEnd())
                    .start(request.getStart())
                    .name(request.getCoachname())
                    .userid(userid)
                    .address(request.getAddress())
                    .description(request.getAddress())
                    .mobilenumber(request.getMobilenumber())
                    .workingdays(request.getWorkingdays())
                    .speciality(request.getSpeciality())
                    .build();
            if(coachService.updateCoachProfile(coachProfile))
                return ResponseEntity.status(HttpStatus.OK).body(true);
            else return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
        }

        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/cancelAppointments")
    public ResponseEntity<?> handlecancelAppointments(@RequestBody appointmentDTO appointmentDTO) {
            try{
               if(appointmentService.CancelAppointment(appointmentDTO))
                return ResponseEntity.status(HttpStatus.OK).body(true);
               else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
            }
            catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
    }

    @PutMapping("/completeAppointment")
    public ResponseEntity<?> handlecompleteAppointment(@RequestBody appointmentDTO appointmentDTO) {
        try{
            if(appointmentService.completeAppointment(appointmentDTO))
                return ResponseEntity.status(HttpStatus.OK).body(true);
            else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/confirmAppointment")
    public ResponseEntity<?> handleconfirmAppointment(@RequestBody appointmentDTO appointmentDTO) {
        try{
            if(appointmentService.confirmAppointment(appointmentDTO))
                return ResponseEntity.status(HttpStatus.OK).body(true);
            else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}
