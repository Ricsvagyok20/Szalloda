class RoomType{
    type;
    bathroom;
    airConditioner;

    constructor(type = "", bathroom = "", airConditioner = true) {
        this.type = type;
        this.bathroom = bathroom;
        this.airConditioner = airConditioner;
    }
}

module.exports = RoomType;