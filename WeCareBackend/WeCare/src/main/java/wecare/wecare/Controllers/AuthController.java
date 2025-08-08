package wecare.wecare.Controllers;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import wecare.wecare.DTO.CoachProfileDTO;
import wecare.wecare.DTO.UsersDTO;
import wecare.wecare.DTO.coachInfoDTO;
import wecare.wecare.DTO.userInfoDTO;
import wecare.wecare.io.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wecare.wecare.repo.CoachProfileRepo;
import wecare.wecare.services.CoachService;
import wecare.wecare.services.MyUserDetailsService;
import wecare.wecare.services.RegisterService;
import wecare.wecare.services.TokenBlackListService;
import wecare.wecare.utils.JwtTokenUtil;

@Slf4j
@RestController
@RequiredArgsConstructor

public class AuthController {

    @Autowired
    private RegisterService registerService;
    @Autowired
    private CoachService  coachService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final MyUserDetailsService userDetailsService;
    private final TokenBlackListService tokenBlackListService;
    private ModelMapper mapper = new ModelMapper();

    private AccountRegisterResponse handleregisterAccount(AccountRegisterRequest req) {
        try {
            log.info("Got Account Regiter Request {}", req.toString());
            UsersDTO user = new UsersDTO();
            mapper.map(req, user);
            AccountRegisterResponse registerResponse = registerService.registerAccount(user);
            log.info("Got Response {}", registerResponse.toString());
            return registerResponse;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/healthcheck")
    public ResponseEntity<Boolean> healthcheck1() {

        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }


    @PostMapping("/registerUser")
    public ResponseEntity<Integer> getUserRegisterRequest(@RequestBody UserRegisterRequest request) {
        log.info("Got UserRegisterRequest {}", request);


        try {

            AccountRegisterRequest registerRequest = new AccountRegisterRequest().builder()
                    .userid(null)
                    .password(request.getPassword())
                    .role("USER")
                    .build();

            AccountRegisterResponse response = handleregisterAccount(registerRequest);
            userInfoDTO userdto = new userInfoDTO().builder()
                    .userid(response.getUserid())
                    .name(request.getName())
                    .dob(request.getDob())
                    .email(request.getEmail())
                    .state(request.getState())
                    .country(request.getCountry())
                    .city(request.getCity())
                    .gender(request.getGender())
                    .mobilenumber(request.getMobilenumber())
                    .pincode(request.getPincode())
                    .build();
            if(registerService.registerUserInfo(userdto))
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response.getUserid());
            else throw new Exception("User Registration Failed");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/registerCoach")
    public ResponseEntity<Integer> getCoachRegisterRequest(@RequestBody CoachRegisterRequest request) {



        try {
            AccountRegisterRequest registerRequest = new AccountRegisterRequest().builder()
                    .password(request.getPassword())
                    .role("COACH").build();

            AccountRegisterResponse response = handleregisterAccount(registerRequest);
            coachInfoDTO coachdto = new coachInfoDTO().builder()
                    .coachid(response.getUserid())
                    .name(request.getName())
                    .dob(request.getDob())
                    .gender(request.getGender())
                    .mobilenumber(request.getMobilenumber())
                    .build();
            CoachProfileDTO coachProfileDTO = new CoachProfileDTO().builder()
                    .userid(response.getUserid())
                    .name(request.getName())
                    .mobilenumber(request.getMobilenumber())
                    .speciality(request.getSpeciality())
                    .build();

            if(registerService.registerCoachInfo(coachdto)) {
                coachService.updateCoachProfile(coachProfileDTO);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response.getUserid());
            }
            else throw new Exception("Coach Registration Failed");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateProfile(@RequestBody LoginRequest authRequest) throws Exception {
        authenticate(authRequest);
        final UserDetails userDetails= userDetailsService.loadUserByUsername(Integer.toString(authRequest.getUserid()));
        final String role = String.valueOf(userDetails.getAuthorities().iterator().next().getAuthority());
        if(!role.substring(5,role.length()).equals(authRequest.getRole())) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse(token,authRequest.getUserid(),authRequest.getRole()));
    }

    private void authenticate(LoginRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserid(), authRequest.getPassword()));
        }catch(DisabledException ex) {
            throw new Exception("Profile Disabled");
        }catch (BadCredentialsException ex) {
            throw new Exception("Bad Credentials");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/signout")
    public void  signout (HttpServletRequest request) {
        String jwtToken = extractJwtTokenFromRequest(request);
        if(jwtToken!=null) {
            tokenBlackListService.addTokenToBlackList(jwtToken);
        }
    }

    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if(bearerToken!=null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }




}

