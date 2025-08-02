package wecare.wecare.Controllers;
import wecare.wecare.DTO.coachDTO;
import wecare.wecare.DTO.userDTO;
import wecare.wecare.io.CoachRegisterRequest;
import wecare.wecare.io.UserRegisterRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import wecare.wecare.services.RegisterService;

@RestController
@RequestMapping
public class UserAuthentication {

    @Autowired
    private RegisterService registerService;
    private final ModelMapper modelMapper=new ModelMapper();




    @GetMapping("/user/healthcheck")
    public ResponseEntity<String> healthcheck1() {

        return new ResponseEntity<String>("Hey there! I am fine1", HttpStatus.OK);
    }
    @GetMapping("/coach/healthcheck")
    public ResponseEntity<String> healthcheck2() {

        return new ResponseEntity<String>("Hey there! I am fine2", HttpStatus.OK);
    }

    @PostMapping("/registerUser")
    public ResponseEntity<String> getUserRegisterRequest(@RequestBody UserRegisterRequest request) {

        userDTO userdto = new userDTO();
        modelMapper.map(request,userdto);
        try {
            if(registerService.registerUser(userdto))
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("User Registered Successfully");
            else throw new Exception("User Registration Failed");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while Registering User: " + e.getMessage());
        }
    }

    @PostMapping("/registerCoach")
    public ResponseEntity<String> getCoachRegisterRequest(@RequestBody CoachRegisterRequest request) {

        coachDTO coachdto = new coachDTO();
        modelMapper.map(request,coachdto);
        try {
            if(registerService.registerCoach(coachdto))
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("Coach Registered Successfully");
            else throw new Exception("Coach Registration Failed");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while Registering Coach: " + e.getMessage());
        }
    }







}

