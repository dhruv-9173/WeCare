import users from "../data/users"

export const authenticate = (LoginRequest) =>
{
    console.log(users);
    const user = users.find(
        user => (user.id === Number(LoginRequest.id) && user.password === LoginRequest.password)
    );
    console.log(user);
    if(user) return user;
    return null;
}