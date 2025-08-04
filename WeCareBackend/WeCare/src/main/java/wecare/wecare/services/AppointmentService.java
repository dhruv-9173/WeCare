package wecare.wecare.services;


import wecare.wecare.DTO.appointmentDTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public interface AppointmentService {

    List<appointmentDTO> getCoachAppointments(int userid);
    Boolean fixappointment(appointmentDTO appointment);
    List<ArrayList<LocalTime>> getTimeSlots(LocalDate date, int coachid);
    Boolean CancelAppointment(appointmentDTO appointment);
    Boolean confirmAppointment(appointmentDTO appointment);
    Boolean completeAppointment(appointmentDTO appointment);
    List<appointmentDTO> getUserAppointments(int userid);


}
