class User {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    picture?: number[];
    role?: Role;

    constructor(
        id?: string,
        username?: string,
        password?: string,
        email?: string,
        picture?: number[],
        role?: Role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.picture = picture;
        this.role = role;
    }



}