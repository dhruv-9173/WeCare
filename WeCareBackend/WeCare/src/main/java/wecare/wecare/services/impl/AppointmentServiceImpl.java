package wecare.wecare.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.CoachProfile;
import wecare.wecare.Entity.appointment;
import wecare.wecare.repo.AppointmentsRepo;
import wecare.wecare.repo.CoachProfileRepo;
import wecare.wecare.services.AppointmentService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentsRepo repo2;
    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private CoachProfileRepo repo1;

    public List<ArrayList<LocalTime>> findAllSlots(
            Map<List<LocalTime>, Boolean> filledSlots,
            LocalTime start,
            LocalTime end,
            int duration) {

        List<ArrayList<LocalTime>> slots = new ArrayList<>();
        LocalTime a = start;
        LocalTime b = a.plusMinutes(duration);

        while (!b.isAfter(end)) {
            List<LocalTime> currentSlot = List.of(a, b);

            if (!filledSlots.containsKey(currentSlot)) {
                ArrayList<LocalTime> availableSlot = new ArrayList<>();
                availableSlot.add(a);
                availableSlot.add(b);
                slots.add(availableSlot);
            }

            a = a.plusMinutes(duration);
            b = b.plusMinutes(duration);
        }

        return slots;
    }

    @Override
    public List<appointmentDTO> getCoachAppointments(int userid) {
        try{

            List<appointment>result = repo2.findAllByCoachid(userid);
            List<appointmentDTO> appointmentDTOs = new ArrayList<>();
            for(appointment a:result){
                appointmentDTOs.add(mapper.map(a,appointmentDTO.class));
            }
            return appointmentDTOs;
        }
        catch(Exception e) {
            return null;
        }
    }

    @Override
    public Boolean fixappointment(appointmentDTO appointment) {
        appointment app=new appointment();
        if(repo2.existsByCoachidAndDateAndStarthrAndEndhr(appointment.getCoachid(),appointment.getDate(),appointment.getStarthr(),appointment.getEndhr()))
        {
            return false;
        }
        mapper.map(appointment,app);
        try {
            repo2.save(app);
            return true;
        }
        catch (Exception e) {
            return false;
        }

    }

    @Override
    public List<ArrayList<LocalTime>> getTimeSlots(LocalDate date, int coachid) {


        List<appointment> appointments= repo2.getByDateAndCoachid(date,coachid);
        CoachProfile profile = repo1.getByUserid(coachid);
        LocalTime start = profile.getStart();
        LocalTime end = profile.getEnd();
        int duration = 30;
        Map<List<LocalTime>,Boolean> filledslots = new HashMap<>();
        List<ArrayList<LocalTime>> results;
        for(appointment a:appointments)
        {
            ArrayList<LocalTime>x;
            if(a.getStatus()==0) {
                x = new ArrayList<>();
                x.add(a.getStarthr());
                x.add(a.getEndhr());
                filledslots.put(x, true);
            }
        }
        results = findAllSlots(filledslots, start, end, duration);
        return results;

    }

    @Override
    public Boolean CancelAppointment(appointmentDTO appointment) {
        appointment app=new appointment();
        mapper.map(appointment,app);
        app.setStatus(2);
        try {
            repo2.save(app);
            return true;
        }
        catch (Exception e) {
            return false;
        }

    }

    @Override
    public Boolean confirmAppointment(appointmentDTO appointment) {
        appointment app=new appointment();
        mapper.map(appointment,app);
        app.setStatus(1);
        try {
            int x  = repo1.getReferenceById(appointment.getCoachid()).getTotalappointments();
            repo2.save(app);
            repo1.getReferenceById(appointment.getCoachid()).setTotalappointments(x+1);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean completeAppointment(appointmentDTO appointment) {
        appointment app=new appointment();
        mapper.map(appointment,app);
        app.setStatus(3);
        try {
            repo2.save(app);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<appointmentDTO> getUserAppointments(int userid) {
        try{

            List<appointment>result = repo2.findAllByUserid(userid);
            List<appointmentDTO> appointmentDTOs = new ArrayList<>();
            for(appointment a:result){
                appointmentDTOs.add(mapper.map(a,appointmentDTO.class));
            }
            return appointmentDTOs;
        }
        catch(Exception e) {
            return null;
        }
    }


}
