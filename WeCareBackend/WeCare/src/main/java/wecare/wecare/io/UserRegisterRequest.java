package io;


import jakarta.validation.constraints.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {

        @NotNull(message = "UserID must be given")
        private String userid;
        @NotNull(message = "Password must be given")
        @Size(min = 5, max = 10, message = "Password must be between 5 and 10 characters")
        private String password;

        @NotBlank(message = "Name is required")
        private String name;

        @Email(message = "Email should be valid")
        private String email;

        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
        private String mobileNumber;

        @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Date of birth must be in the format YYYY-MM-DD")
        private String dob;

        @Pattern(regexp = "^(Male|Female)$", message = "Gender must be Male, Female, or Other")
        private String gender;

        private String country;

        private String city;

        private String state;

        @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits")
        private String pincode;

        @Pattern(regexp = "^(coach|user)$", message="invalid role")
        private String role;
}
