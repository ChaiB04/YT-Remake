import Role from '../enums/Role'


class User {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    picture?: number[] | Uint8Array;
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

export default User