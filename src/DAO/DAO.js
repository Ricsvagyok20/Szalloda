const Guest = require("../Models/Guest");
const Partakes = require("../Models/Partakes");
const Programs = require("../Models/Programs");
const Reservation = require("../Models/Reservation");
const Room = require("../Models/Room");
const RoomType = require("../Models/RoomType");

class DAO{

static QUERIES = {
    //Nem admin felhasználó számára elérhető programok
    getProgramsByIDQuery: "SELECT Tipus, Mettol, Meddig FROM program WHERE Meddig <= (SELECT Vege FROM vendeg WHERE Szemelyi_igazolvany_szam = ?) AND Mettol >= (SELECT Kezdete FROM vendeg WHERE Szemelyi_igazolvany_szam = ?) ORDER BY Mettol",
    //Hany szoba van tipusonkent
    getAmountOfRoomTypesQuery: "SELECT szobatipus.Tipus, COUNT(*) AS darabszam FROM szoba, szobatipus WHERE szoba.Tipus = szobatipus.Tipus GROUP BY szobatipus.Tipus",
    //Osszesen hany napot vesznek részt programonként
    getProgramsByPartakesQuery: "SELECT program.Tipus, SUM(DATEDIFF(resztvesz.Meddig, resztvesz.Mettol)) AS ossznap FROM program, resztvesz WHERE program.Tipus = resztvesz.Tipus GROUP BY program.Tipus",
    getAllGuestQuery: "SELECT * FROM vendeg",
    createGuestQuery: "INSERT INTO vendeg VALUES(?,?,?,?,?,?,?,?)",
    updateGuestQuery: "UPDATE vendeg SET Vezeteknev = ?, Keresztnev = ?, E_mail = ?, Jelszo = ? WHERE Szemelyi_igazolvany_szam = ?",
    deleteGuestQuery: "DELETE FROM vendeg WHERE Szemelyi_igazolvany_szam = ?",
    getAllPartakesQuery: "SELECT * FROM resztvesz",
    createPartakesQuery: "INSERT INTO resztvesz VALUES(?,?,?,?)",
    updatePartakesQuery: "UPDATE resztvesz SET Szemelyi_igazolvany_szam = ? WHERE Tipus = ? AND Mettol = ? AND Meddig = ?",
    deletePartakesQuery: "DELETE FROM resztvesz WHERE Szemelyi_igazolvany_szam = ? AND Tipus = ? AND Mettol = ? AND Meddig = ?",
    getAllProgramsQuery: "SELECT * FROM program",
    createProgramsQuery: "INSERT INTO program VALUES(?,?,?)",
    updateProgramsQuery: "UPDATE program SET Mettol = ?, Meddig = ? WHERE Tipus = ?",
    deleteProgramsQuery: "DELETE FROM program WHERE Tipus = ? AND Mettol = ? AND Meddig = ?",
    getAllReservationQuery: "SELECT * FROM foglalas",
    createReservationQuery: "INSERT INTO foglalas VALUES(?,?,?,?)",
    updateReservationQuery: "UPDATE foglalas SET Kezdete = ?, Vege = ?, Online = ? WHERE Szobaszam = ?",
    deleteReservationQuery: "DELETE FROM foglalas WHERE Szobaszam = ? AND Kezdete = ? AND Vege = ?",
    getAllRoomQuery: "SELECT * FROM szoba",
    createRoomQuery: "INSERT INTO szoba VALUES(?,?,?,?,?)",
    updateRoomQuery: "UPDATE szoba SET Szemelyek_szama = ?, Erkely = ?, Agymeret = ?, Tipus = ? WHERE Szobaszam = ?",
    deleteRoomQuery: "DELETE FROM szoba WHERE Szobaszam = ?",
    getAllRoomTypeQuery: "SELECT * FROM szobatipus",
    createRoomTypeQuery: "INSERT INTO szobatipus VALUES(?,?,?)",
    updateRoomTypeQuery: "UPDATE szobatipus SET Furdoszoba = ?, Legkondi = ? WHERE Tipus = ?",
    deleteRoomTypeQuery: "DELETE FROM szobatipus WHERE Tipus = ?",
    getGuestQuery: "SELECT * FROM vendeg WHERE Szemelyi_igazolvany_szam = ?",
    getReservationQuery: "SELECT * FROM foglalas WHERE Szobaszam = ? AND Kezdete = ? AND Vege = ?"
}

constructor() {
    this.className = "DAO";
    this.db = require("../Database/db");
}

getProgramsByPartakes(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getProgramsByPartakesQuery, (error, result) => {
            if (error) reject(error);
            let queryResult = [];
            //console.log(result);
            for (let i of result) {
                queryResult.push({"type":i["Tipus"], "sumOfDays":i["ossznap"]});
            }
            resolve(queryResult);
        });
    });
}

getAmountOfRoomTypes(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAmountOfRoomTypesQuery, (error, result) => {
            if (error) reject(error);
            let queryResult = [];
            //console.log(result);
            for (let i of result) {
                queryResult.push({"type":i["Tipus"], "amount":i["darabszam"]});
            }
            resolve(queryResult);
        });
    });
}

getProgramsByID(ID){
    return new Promise((resolve, reject)=>{
        this.db.query(DAO.QUERIES.getProgramsByIDQuery, [ID, ID], (error, result)=>{
            if(error){
                reject(error);
            }
            let queryResult = [];
            for(let i of result){
                queryResult.push(new Programs(i["Tipus"], i["Mettol"], i["Meddig"]));
            }
            resolve(queryResult);
        });
    });
}

getAllGuest(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAllGuestQuery, (error, result) => {
            if (error) reject(error);/*
            if (result && result.length > 0) {
                console.log(this.className, 'Successful query!');
            } else {
                console.log(this.className, 'Empty query result!!');
            }*/
            let queryResult = [];
            for (let i of result) {
                queryResult.push(new Guest(i["Szemelyi_igazolvany_szam"], i["Vezeteknev"], i["Keresztnev"], i["E_mail"], i["Jelszo"], i["Szobaszam"], i["Kezdete"], i["Vege"]));
            }
            resolve(queryResult);
        });
    });
}

createGuest(guest){
    return new Promise((resolve, reject)=>{
        if(!guest instanceof Guest){
            console.error('Invalid Guest!')
            reject(false);
        }
        console.log("createGuest", guest);
        this.db.query(DAO.QUERIES.createGuestQuery, [guest.ID, guest.lastname, guest.firstname, guest.email, guest.password, guest.roomNumber, guest.start, guest.end], (error, result) => {
            if(error){
                reject(error);
            }
            console.log("Sikeres vendég létrehozás!");
            resolve(result);
        });
    });
}

updateGuest(lastname, firstname , email, password, ID) {
    return new Promise((resolve, reject) => {
        if (typeof lastname !== "string" || typeof firstname !== "string" || typeof email !== "string" || typeof password !== "string" || typeof ID !== "number") {
            console.error('Invalid Guest parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.updateGuestQuery, [lastname, firstname, email, password, ID], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres vendég adatmódosítás!");
            resolve(result);
        });
    });
}

deleteGuest(ID){
    return new Promise((resolve, reject) => {
        if (typeof ID !== "number") {
            console.error('Invalid Guest ID!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.deleteGuestQuery, [ID], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres vendég törlés!");
            resolve(result);
        });
    });
}

getAllPartakes(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAllPartakesQuery, (error, result) => {
            if (error) reject(error);/*
            if (result && result.length > 0) {
                console.log(this.className, 'Successful query!');
            } else {
                console.log(this.className, 'Empty query result!!');
            }*/
            let queryResult = [];
            for (let i of result) {
                queryResult.push(new Partakes(i["Szemelyi_igazolvany_szam"], i["Tipus"], i["Mettol"], i["Meddig"]));
            }
            resolve(queryResult);
        });
    });
}

createPartakes(partakes){
    return new Promise((resolve, reject)=>{
        if(!(partakes instanceof Partakes)){
            console.error('Invalid Partakes!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.createPartakesQuery, [partakes.ID, partakes.type, partakes.from, partakes.until], (error, result) => {
            if(error){
                reject(error);
            }
            console.log("Sikeres résztvesz létrehozás!");
            resolve(result);
        });
    });
}

updatePartakes(ID, type, from, until){
    return new Promise((resolve, reject) => {
        if( typeof ID !== "number" ||  typeof type !== "string" || !from instanceof Date || !until instanceof Date){
            console.error('Invalid Partakes parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.updatePartakesQuery, [ID, type, from, until], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres résztvesz adatmódosítás!");
            resolve(result);
        });
    });
}

deletePartakes(ID, type, from, until){
    return new Promise((resolve, reject) => {
        if (typeof ID !== "number" || typeof type !== "string" || !from instanceof Date || !until instanceof Date) {
            console.error('Invalid Partakes delete!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.deletePartakesQuery, [ID, type, from, until], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres résztvesz törlés!");
            resolve(result);
        });
    });
}

getAllPrograms(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAllProgramsQuery, (error, result) => {
            if (error) reject(error);/*
            if (result && result.length > 0) {
                console.log(this.className, 'Successful query!');
            } else {
                console.log(this.className, 'Empty query result!!');
            }*/
            let queryResult = [];
            for (let i of result) {
                queryResult.push(new Programs(i["Tipus"], i["Mettol"], i["Meddig"]));
            }
            resolve(queryResult);
        });
    });
}

createPrograms(programs){
    return new Promise((resolve, reject)=>{
        if(!(programs instanceof Programs)){
            console.error('Invalid Programs!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.createProgramsQuery, [programs.type, programs.from, programs.until], (error, result) => {
            if(error){
                reject(error);
            }
            console.log("Sikeres program létrehozás!");
            resolve(result);
        });
    });
}

updatePrograms(programs){
    return new Promise((resolve, reject) => {
        if (!(programs instanceof Programs)) {
            console.error('Invalid Programs!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.updateProgramsQuery, [programs.from, programs.until, programs.type], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres program adatmódosítás!");
            resolve(result);
        });
    });
}

deletePrograms(type, from, until){
    return new Promise((resolve, reject) => {
        if (typeof type !== "string" || !from instanceof Date || !until instanceof Date){
            console.error('Invalid Programs parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.deleteProgramsQuery, [type, from, until], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres program törlés!");
            resolve(result);
        });
    });
}

getAllReservation(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAllReservationQuery, (error, result) => {
            if (error) reject(error);/*
            if (result && result.length > 0) {
                console.log(this.className, 'Successful query!');
            } else {
                console.log(this.className, 'Empty query result!!');
            }*/
            let queryResult =[];
            for (let i of result) {
                queryResult.push(new Reservation(i["Szobaszam"], i["Kezdete"], i["Vege"], i["Online"]));
            }
            resolve(queryResult);
        });
    });
}

createReservation(reservation){
    return new Promise((resolve, reject)=>{
        if(!(reservation instanceof Reservation)){
            console.error('Invalid Reservation!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.createReservationQuery, [reservation.roomNumber, reservation.start, reservation.end, reservation.online], (error, result) => {
            if(error){
                reject(error);
            }
            console.log("Sikeres foglalas létrehozás!");
            resolve(result);
        });
    });
}

updateReservation(reservation){
    return new Promise((resolve, reject) => {
        if (!(reservation instanceof Reservation)) {
            console.error('Invalid Reservation!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.updateReservationQuery, [reservation.start, reservation.end, reservation.online, reservation.roomNumber], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres foglalas adatmódosítás!");
            resolve(result);
        });
    });
}

deleteReservation(roomNumber, start, end){
    return new Promise((resolve, reject) => {
        if (typeof roomNumber !== "number" || !start instanceof Date || !end instanceof Date) {
            console.error('Invalid Reservation parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.deleteReservationQuery, [roomNumber, start, end], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres foglalas törlés!");
            resolve(result);
        });
    });
}

getAllRoom(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAllRoomQuery, (error, result) => {
            if (error) reject(error);/*
            if (result && result.length > 0) {
                console.log(this.className, 'Successful query!');
            } else {
                console.log(this.className, 'Empty query result!!');
            }*/
            let queryResult = [];
            for (let i of result) {
                queryResult.push(new Room(i["Szobaszam"], i["Szemelyek_szama"], i["Erkely"], i["Agymeret"], i["Tipus"]));
            }
            resolve(queryResult);
        });
    });
}

createRoom(room){
    return new Promise((resolve, reject)=>{
        if(!room instanceof Room){
            console.error('Invalid Room!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.createRoomQuery, [room.roomNumber, room.numberOfPeople, room.balcony, room.bedsize, room.type], (error, result) => {
            if(error){
                reject(error);
            }
            console.log("Sikeres szoba létrehozás!");
            resolve(result);
        });
    });
}

updateRoom(numberOfPeople, balcony, bedsize, type, roomNumber){
    return new Promise((resolve, reject) => {
        if(typeof numberOfPeople !== "number" || typeof balcony !== "boolean" || typeof bedsize !== "number" || typeof type !== "string" || typeof roomNumber !== "number"){
            console.error('Invalid Room parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.updateRoomQuery, [numberOfPeople, balcony, bedsize, type, roomNumber], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres szoba adatmódosítás!");
            resolve(result);
        });
    });
}

deleteRoom(roomNumber){
    return new Promise((resolve, reject) => {
        if (typeof roomNumber !== "number") {
            console.error('Invalid Room parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.deleteRoomQuery, [roomNumber], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres szoba törlés!");
            resolve(result);
        });
    });
}

getAllRoomType(){
    return new Promise((resolve, reject)=> {
        this.db.query(DAO.QUERIES.getAllRoomTypeQuery, (error, result) => {
            if (error) reject(error);/*
            if (result && result.length > 0) {
                console.log(this.className, 'Successful query!');
            } else {
                console.log(this.className, 'Empty query result!!');
            }*/
            let queryResult = [];
            for (let i of result) {
                queryResult.push(new RoomType(i["Tipus"], i["Furdoszoba"], i["Legkondi"]));
            }
            resolve(queryResult);
        });
    });
}

createRoomType(roomType){
    return new Promise((resolve, reject)=>{
        if(!roomType instanceof RoomType){
            console.error('Invalid RoomType!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.createRoomTypeQuery, [roomType.type, roomType.bathroom, roomType.airConditioner], (error, result) => {
            if(error){
                reject(error);
            }
            console.log("Sikeres szobatípus létrehozás!");
            resolve(result);
        });
    });
}

updateRoomType(bathroom, airConditioner, type){
    return new Promise((resolve, reject) => {
        if(typeof bathroom !== "string" || typeof airConditioner !== "boolean" || typeof type !== "string"){
            console.error('Invalid RoomType parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.updateRoomTypeQuery, [bathroom, airConditioner, type], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres szobatípus adatmódosítás!");
            resolve(result);
        });
    });
}

deleteRoomType(type){
    return new Promise((resolve, reject) => {
        if (typeof type !== "string") {
            console.error('Invalid RoomType parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.deleteRoomTypeQuery, [type], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres szobatípus törlés!");
            resolve(result);
        });
    });
}

getGuest(ID){
    return new Promise((resolve, reject)=> {
        if (typeof ID !== "number") {
            console.error('Invalid Guest!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.getGuestQuery, [ID],(error, result) => {
            if(error){
                reject(error);
            }
            if(result[0] === undefined){
                reject(false);
                return false;
            }
            console.log("Sikeres vendeg visszaadva!");
            resolve(new Guest(result[0]["Szemelyi_igazolvany_szam"], result[0]["Vezeteknev"], result[0]["Keresztnev"], result[0]["E_mail"], result[0]["Jelszo"], result[0]["Szobaszam"], result[0]["Kezdete"], result[0]["Vege"]));
        });
    });
}

getReservation(roomNumber, start, end){
    return new Promise((resolve, reject) => {
        if (typeof roomNumber !== "number" || !(start instanceof Date) || !(end instanceof Date)) {
            console.error('Invalid Reservation parameters!')
            reject(false);
        }
        this.db.query(DAO.QUERIES.getReservationQuery, [roomNumber, start, end], (error, result) => {
            if (error) {
                reject(error);
            }
            console.log("Sikeres foglalas visszaadva!");
            resolve(new Reservation(result[0]["Szobaszam"], result[0]["Kezdete"], result[0]["Vege"], result[0]["Online"]));
        });
    });
}

}

module.exports = DAO;