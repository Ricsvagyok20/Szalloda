class Room{
    roomNumber;
    numberOfPeople;
    balcony;
    bedsize;
    type;

    constructor(roomNumber = 0, numberOfPeople = 0, balcony = true, bedsize = 0, type = ""){
        this.roomNumber = roomNumber;
        this.numberOfPeople = numberOfPeople;
        this.balcony = balcony;
        this.bedsize = bedsize;
        this.type = type;
    }
}

module.exports = Room;