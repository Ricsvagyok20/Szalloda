class Partakes{
    ID;
    type;
    from;
    until;

    constructor(ID = 0, type = "", from = new Date(), until = new Date()) {
        this.ID = ID;
        this.type = type;
        this.from = from;
        this.until = until;
    }
}

module.exports = Partakes;