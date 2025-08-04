package wecare.wecare.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import wecare.wecare.Entity.appointment;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentsRepo extends JpaRepository<appointment,Integer> {

    List<appointment> getByDateAndCoachid(LocalDate date, int coachid);


    boolean existsByCoachidAndDateAndStarthrAndEndhr(int coachid, LocalDate date, LocalTime starthr, LocalTime endhr);

    List<appointment> findAllByCoachid(int userid);

    List<appointment> findAllByUserid(int userid);
}
