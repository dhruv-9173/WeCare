package wecare.wecare.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.CommentDTO;
import wecare.wecare.Entity.CoachProfile;
import wecare.wecare.Entity.Comment;
import wecare.wecare.repo.CoachProfileRepo;
import wecare.wecare.repo.CommentRepo;
import wecare.wecare.services.UserService;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper=new ModelMapper();
    @Autowired
    private CoachProfileRepo repo1;
    @Autowired
    private CommentRepo repo2;



    @Override
    public List<CoachProfileDTO> getAllCoaches() {
        List<CoachProfile> results = repo1.findAll();
        if(!results.isEmpty()){
            List<CoachProfileDTO> coaches =  new ArrayList<>();
            for (CoachProfile coach : results) {
                coaches.add(modelMapper.map(coach, CoachProfileDTO.class));
            }
            System.out.println(coaches);
            return coaches;
        }
        return null;

    }

    @Override
    public Boolean addComments(CommentDTO comment) {
        try {
            Comment req = modelMapper.map(comment, Comment.class);
            repo2.save(req);
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Boolean addRatings(int rating, int coachid) {
        try{
            CoachProfile profile = repo1.getGetByUserid(coachid);
            double userRating =  profile.getRating();
            int n = profile.getTotalappointments();
            userRating = ((userRating + rating)/n)*500;
            repo1.save(profile);
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<CommentDTO> getAllComments(int coachid) {
        List<Comment> results = repo2.findAllByCoachid(coachid);
        if(!results.isEmpty()){
            List<CommentDTO> comments =  new ArrayList<>();
            for (Comment comment : results) {
                comments.add(modelMapper.map(comment, CommentDTO.class));
            }
            return comments;
        }
        return null;
    }


}
