package wecare.wecare.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import wecare.wecare.Entity.users;
import wecare.wecare.repo.AccountsRepo;

import java.util.Collections;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private final AccountsRepo repo;

    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
        int parsedUserId;
        try {
            parsedUserId = Integer.parseInt(userid);
        } catch (NumberFormatException e) {
            log.error("Invalid userid format: {}", userid, e);
            throw new UsernameNotFoundException("User ID must be a number.");
        }

        users user = repo.findByUserid(parsedUserId);

        if (user == null) {
            log.warn("User not found with userid: {}", userid);
            throw new UsernameNotFoundException("User not found with userid: " + userid);
        }

        String role = user.getRole();
        if (role == null || role.trim().isEmpty()) {
            log.warn("No role assigned for userid: {}", userid);
            throw new UsernameNotFoundException("No role assigned to user.");
        }

        String grantedAuthority = "ROLE_" + role.trim().toUpperCase(); // trimming whitespace just in case
        log.info("Logging in user: {} with role: {}", user.getUserid(), grantedAuthority);

        return new User(
                String.valueOf(user.getUserid()),
                user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(grantedAuthority))
        );
    }
}
