package wecare.wecare.services;

import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.appointment;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface UserService {

    List<CoachProfileDTO> getAllCoaches();
    List<ArrayList<LocalTime>> getTimeSlots(LocalDate date, int coachid);
    Boolean fixappointment(appointmentDTO appointment);
}
