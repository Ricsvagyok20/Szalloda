class Programs{
    type;
    from;
    until;

    constructor(type = "", from = new Date(), until = new Date()) {
        this.type = type;
        this.from = from;
        this.until = until;
    }

}

module.exports = Programs;