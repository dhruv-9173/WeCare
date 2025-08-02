package services.impl;

import DTO.userDTO;
import Entity.user;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import repo.UserRepo;
import services.RegisterService;

@Service

public class RegisterServiceImpl implements RegisterService {

    private UserRepo repo;
    private ModelMapper mapper;
    @Override
    public Boolean registerUser(userDTO user) {
        user newUser = new user();
        mapper.map(user,newUser);
        try {
            repo.save(newUser);
            return true;
        }
        catch (Exception e) {
            System.out.println( e.getMessage() );
            return false;
        }

    }

}
