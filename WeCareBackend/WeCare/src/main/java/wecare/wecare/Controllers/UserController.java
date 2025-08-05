package wecare.wecare.Controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.CommentDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.Comment;
import wecare.wecare.io.AppointmentRequest;
import wecare.wecare.services.AppointmentService;
import wecare.wecare.services.UserService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;
    private final ModelMapper mapper = new ModelMapper();

    @GetMapping("/loadcoaches")
    public ResponseEntity<List<CoachProfileDTO>>handleloadcoaches(){

        try{
            List<CoachProfileDTO> results= userService.getAllCoaches();
            if(results == null || !results.isEmpty()){
                return ResponseEntity.ok(results);
            }
            return ResponseEntity.notFound().build();
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/gettimeslots")
    public ResponseEntity<List<ArrayList<LocalTime>>> handleGetTimeSlots(
            @RequestParam LocalDate date,
            @RequestParam int coachid) {
        try {



            List<ArrayList<LocalTime>> results = appointmentService.getTimeSlots(date, coachid);

            if (results != null && !results.isEmpty()) {
                return ResponseEntity.ok(results);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }

        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PostMapping("/fixappointment")
    public ResponseEntity<Boolean>handlefixappointment(@RequestBody AppointmentRequest req)
    {
        try{
            if(req.getDate().isBefore(LocalDate.now()) || ( req.getDate().isEqual(LocalDate.now()) && (req.getStarthr().isBefore(LocalTime.now()) || req.getStarthr().isAfter(LocalTime.now()))))
            {
                return ResponseEntity.badRequest().body(false);
            }

            appointmentDTO dto =  new appointmentDTO();
            mapper.map(req,dto);
            if(appointmentService.fixappointment(dto))
                return ResponseEntity.ok(true);
            else
                return ResponseEntity.ok(false);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/addcomment")
    public ResponseEntity<Boolean>handleaddcomment(@RequestBody Comment req)
    {
        try{
            CommentDTO commentDTO = new CommentDTO();
            mapper.map(req,commentDTO);
            if(userService.addComments(commentDTO))
            {
                return ResponseEntity.ok(true);
            }
            else return  ResponseEntity.badRequest().body(false);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/putRating")
    public ResponseEntity<Boolean>handeladdrating(@RequestParam int rating,@RequestParam int coachid)
    {
        try {
            if(userService.addRatings(rating,coachid))
            {
                return ResponseEntity.ok(true);
            }
            else return ResponseEntity.badRequest().body(false);
        }
        catch(Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }








}
