package services;

import DTO.userDTO;
import org.springframework.stereotype.Service;


public interface RegisterService {


    Boolean registerUser(userDTO user);
}
