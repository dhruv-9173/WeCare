package wecare.wecare.services;

import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.CommentDTO;
import wecare.wecare.DTO.appointmentDTO;
import wecare.wecare.Entity.CoachProfile;
import wecare.wecare.Entity.appointment;
import wecare.wecare.io.UserInfoResponse;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface UserService {

    List<CoachProfileDTO> getAllCoaches();
    Boolean addComments(CommentDTO comment);
    Boolean addRatings(int rating, int coachid);
    List<CommentDTO> getAllComments(int coachid);
}
