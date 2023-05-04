class Guest{
    ID;
    lastname;
    firstname;
    email;
    password;
    roomNumber;
    start;
    end;
    constructor(ID = 0, lastname = "", firstname = "", email = "", birthDate = new Date(), roomNumber = 0, start = new Date(), end = new Date()) {
        this.ID = ID;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.password = birthDate;
        this.roomNumber = roomNumber;
        this.start = start;
        this.end = end;
    }
}

module.exports = Guest;