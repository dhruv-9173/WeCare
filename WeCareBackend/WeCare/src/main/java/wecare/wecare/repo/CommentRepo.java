package wecare.wecare.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import wecare.wecare.Entity.Comment;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByCoachid(int coachid);
}
