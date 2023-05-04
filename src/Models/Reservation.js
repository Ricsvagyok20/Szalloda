class Reservation{
    roomNumber;
    start;
    end;
    online;

    constructor(roomNumber = 0, start = new Date(), end = new Date(), online = true) {
        this.roomNumber = roomNumber;
        this.start = start;
        this.end = end;
        this.online = online;
    }
}

module.exports = Reservation;