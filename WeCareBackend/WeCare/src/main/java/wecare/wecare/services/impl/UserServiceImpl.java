package wecare.wecare.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.CoachProfile;
import wecare.wecare.Entity.appointment;
import wecare.wecare.repo.AppointmentsRepo;
import wecare.wecare.repo.CoachProfileRepo;
import wecare.wecare.services.UserService;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper=new ModelMapper();
    @Autowired
    private CoachProfileRepo repo1;
    @Autowired
    private AppointmentsRepo repo2;

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
    public List<CoachProfileDTO> getAllCoaches() {


        List<CoachProfile> results = repo1.findAll();
        if(results!=null && results.isEmpty()==false){
            List<CoachProfileDTO> coaches =  new ArrayList<CoachProfileDTO>();
            for (CoachProfile coach : results) {
                coaches.add(modelMapper.map(coach, CoachProfileDTO.class));
            }
            System.out.println(coaches);
            return coaches;
        }
        return null;

    }

    @Override
    public List<ArrayList<LocalTime>> getTimeSlots(LocalDate date, int coachid) {
        Date date1 = java.sql.Date.valueOf(date);

        List<appointment> appointments= repo2.getByDateAndCoachid(date1,coachid);
        CoachProfile profile = repo1.getByUserid(coachid);
        LocalTime start = profile.getStart();
        LocalTime end = profile.getEnd();
        int duration = 30;
        Map<List<LocalTime>,Boolean> filledslots = new HashMap<>();
        List<ArrayList<LocalTime>> results = new ArrayList<>();
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
    public Boolean fixappointment(appointmentDTO appointment) {
        appointment app=new appointment();
        if(repo2.existsByCoachidAndDateAndStarthrAndEndhr(appointment.getCoachid(),appointment.getDate(),appointment.getStarthr(),appointment.getEndhr()))
        {
            return false;
        }
        modelMapper.map(appointment,app);
        try {
            repo2.save(app);
            return true;
        }
        catch (Exception e) {
            return false;
        }

    }
}
