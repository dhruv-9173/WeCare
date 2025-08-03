package wecare.wecare.Controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.Comment;
import wecare.wecare.io.AppointmentRequest;
import wecare.wecare.io.cancelAppointments;
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
    private final ModelMapper mapper = new ModelMapper();

    @GetMapping("/loadcoaches")
    public ResponseEntity<List<CoachProfileDTO>>handleloadcoaches(){

        try{
            List<CoachProfileDTO> results= userService.getAllCoaches();
            if(results!=null){
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
            @RequestParam String date_string,
            @RequestParam int coachid) {
        try {

            LocalDate date = LocalDate.parse(date_string);

            List<ArrayList<LocalTime>> results = userService.getTimeSlots(date, coachid);

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
            if(req.getDate().isBefore(LocalDate.now()) || req.getStarthr().isBefore(LocalTime.now()) || req.getStarthr().isAfter(LocalTime.now()))
            {
                return ResponseEntity.badRequest().body(false);
            }
            appointmentDTO dto =  new appointmentDTO();
            mapper.map(req,dto);
            if(userService.fixappointment(dto))
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
        return null;
    }

    @PostMapping
    public ResponseEntity<Boolean>handeladdrating(@RequestBody double rating)
    {
        return null;
    }

    @GetMapping("/getComments")
    public ResponseEntity<Collection<Comment>>handlegetComments(@RequestParam Integer coachid)
    {
        return null;
    }

    @GetMapping("/getrating")
    public ResponseEntity<Double>handlegetrating()
    {
        return null;
    }

    @PutMapping("/cancelAppointments")
    public ResponseEntity<appointmentDTO>handlecancelAppointments(@RequestBody cancelAppointments request) {
        return ResponseEntity.ofNullable(null);
    }



}
