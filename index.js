const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const router = express.Router();
const PORT = process.env.PORT || 8080;
const DAO = require("./src/DAO/DAO");
const DAOObject = new DAO();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const oneDay = 1000 * 60 * 60 * 24;
const Guest = require("./src/Models/Guest");
const Partakes = require("./src/Models/Partakes");
const Programs = require("./src/Models/Programs");
const Reservation = require("./src/Models/Reservation");
const Room = require("./src/Models/Room");
const RoomType = require("./src/Models/RoomType");


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

router.get("/Programs",(req, res)=>{
    DAOObject.getAllPrograms().then((result)=>{
        let tabla = [];
        let tabla2 = [];
        for(let i of result){
            i["from"].setDate(i["from"].getDate() + 1);
            i["until"].setDate(i["until"].getDate() + 1);
            tabla.push({"type":i["type"], "from":i["from"].toISOString().split("T")[0], "until":i["until"].toISOString().split("T")[0]});
        }
        DAOObject.getProgramsByPartakes().then(result=>{
            for(let i of result){
                tabla2.push(i);
            }
            res.render("Programs", {programs:tabla, daysums:tabla2});
        });
    });
});

router.get("/Main" ,(req, res)=>{
    res.render("Main");
});

router.get("/Login" ,(req, res)=>{
    res.render("Login", {nonuser:undefined});
});

router.get("/Profile" ,(req, res)=>{
    if(req.session.loggedin){
        let ID = req.session.ID;
        let password = req.session.password;
        if(ID === 11111111 && password === "admin123"){
            //console.log("Welcome admin!");
            DAOObject.getAllGuest().then((result)=>{
                let tabla1 = [];
                let tabla2 = [];
                let tabla3 = [];
                let tabla4 = [];
                let tabla5 = [];
                let tabla6 = [];
                for(let i of result){
                    i["start"].setDate(i["start"].getDate() + 1);
                    i["end"].setDate(i["end"].getDate() + 1);
                    tabla1.push({"ID":i["ID"], "lastname":i["lastname"], "firstname":i["firstname"], "email":i["email"], "password":i["password"], "roomNumber":i["roomNumber"], "start":i["start"].toISOString().split("T")[0], "end":i["end"].toISOString().split("T")[0]})
                }
                DAOObject.getAllPartakes().then((result)=>{
                    for(let i of result){
                        i["from"].setDate(i["from"].getDate() + 1);
                        i["until"].setDate(i["until"].getDate() + 1);
                        tabla2.push({"ID":i["ID"], "type":i["type"], "from":i["from"].toISOString().split("T")[0], "until":i["until"].toISOString().split("T")[0]});
                    }
                    DAOObject.getAllPrograms().then((result)=>{
                        for(let i of result){
                            i["from"].setDate(i["from"].getDate() + 1);
                            i["until"].setDate(i["until"].getDate() + 1);
                            tabla3.push({"type":i["type"], "from":i["from"].toISOString().split("T")[0], "until":i["until"].toISOString().split("T")[0]});
                        }
                        DAOObject.getAllReservation().then((result)=>{
                            for(let i of result){
                                i["start"].setDate(i["start"].getDate() + 1);
                                i["end"].setDate(i["end"].getDate() + 1);
                                tabla4.push({"roomNumber":i["roomNumber"], "start":i["start"].toISOString().split("T")[0], "end":i["end"].toISOString().split("T")[0], "online":i["online"]});
                            }
                            DAOObject.getAllRoom().then((result)=>{
                                for(let i of result){
                                    tabla5.push({"roomNumber":i["roomNumber"], "numberOfPeople":i["numberOfPeople"], "balcony":i["balcony"], "bedsize":i["bedsize"], "type":i["type"]});
                                }
                                DAOObject.getAllRoomType().then((result)=>{
                                    for(let i of result){
                                        tabla6.push({"type":i["type"], "bathroom":i["bathroom"], "airConditioner":i["airConditioner"]});
                                    }
                                    res.render("Profile", {occupant:undefined, available:undefined, guests:tabla1, partakes:tabla2, programs:tabla3, reservations:tabla4, rooms:tabla5, roomTypes:tabla6});
                                });
                            });
                        });
                    });
                });
            });
        }
        else{
            DAOObject.getGuest(ID).then((result)=>{
                console.log("Welcome non-admin user!");
                //console.log(result);
                result["start"].setDate(result["start"].getDate() + 1);
                result["end"].setDate(result["end"].getDate() + 1);
                let end = result["end"].toISOString().split("T")[0];
                let tabla = {"ID":result["ID"], "lastname":result["lastname"], "firstname":result["firstname"], "email":result["email"], "password":result["password"], "roomNumber":result["roomNumber"], "start":result["start"].toISOString().split("T")[0], "end":end};
                let tabla2 = [];
                DAOObject.getProgramsByID(ID).then(result=>{
                    for(let i of result){
                        i["from"].setDate(i["from"].getDate() + 1);
                        i["until"].setDate(i["until"].getDate() + 1);
                        tabla2.push({"type":i["type"], "from":i["from"].toISOString().split("T")[0], "until":i["until"].toISOString().split("T")[0]});
                    }
                    res.render("Profile", {occupant:tabla, available:tabla2, guests:undefined, partakes:undefined, programs:undefined, reservations:undefined, rooms:undefined, roomTypes:undefined});
                }).catch(e=>console.log(e));
            }).catch(e=>{
                console.error(e)
                res.redirect("/Logout");
            });
        }
    }
    else{
        res.redirect("/Login");
    }
});

router.get("/" ,(req, res)=>{
    res.redirect("/Main");
});

router.get("/Reservations" ,(req, res)=>{
    DAOObject.getAllReservation().then((result)=>{
        let tabla = [];
        let tabla2 = [];
        for(let i of result){
            i["start"].setDate(i["start"].getDate() + 1);
            i["end"].setDate(i["end"].getDate() + 1);
            tabla.push({"roomNumber":i["roomNumber"], "start":i["start"].toISOString().split("T")[0], "end":i["end"].toISOString().split("T")[0], "online":i["online"]});
        }
        DAOObject.getAmountOfRoomTypes().then((result=>{
            for(let i of result){
                tabla2.push(i);
            }
            res.render("Reservations", {reservations:tabla, roomamounts:tabla2});
        })).catch(e=>console.error(e));
    });
});

router.post('/deleteGuest', (req, res)=>{
    let guestID = parseInt(req.body.delID);
    DAOObject.deleteGuest(guestID).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post('/deletePartakes', (req, res)=>{
    let guestID = parseInt(req.body.delID);
    let type = req.body.delType;
    let from = req.body.delFrom;
    let until = req.body.delUntil;
    DAOObject.deletePartakes(guestID, type, from, until).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post('/deleteProgram', (req, res)=>{
    let type = req.body.delType;
    let from = req.body.delFrom;
    let until = req.body.delUntil;
    DAOObject.deletePrograms(type, from, until).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post('/deleteReservation', (req, res)=>{
    let roomNumber = parseInt(req.body.delRoomNumber);
    let start = req.body.delStart;
    let end = req.body.delEnd;
    DAOObject.deleteReservation(roomNumber, start, end).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post('/deleteRoom', (req, res)=>{
    let roomNumber = parseInt(req.body.delRoomNumber);
    DAOObject.deleteRoom(roomNumber).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post('/deleteRoomType', (req, res)=>{
    let type = req.body.delType;
    console.log(type);
    DAOObject.deleteRoomType(type).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post("/createGuest", (req, res)=>{
    let result = req.body;
    let guest = new Guest(result["ID"], result["firstname"], result["lastname"], result["email"], result["password"], result["roomNumber"], result["start"], result["end"]);
    DAOObject.createGuest(guest).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>{
        console.error(e);
        res.redirect("/Profile");
    });
});

router.post("/createPartakes", (req, res)=>{
    let result = req.body;
    let partakes = new Partakes(result["ID"], result["type"], result["from"], result["until"]);
    DAOObject.createPartakes(partakes).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>{
        console.error(e);
        res.redirect("/Profile");
    });
});

router.post("/createProgram", (req, res)=>{
    let result = req.body;
    let program = new Programs(result["type"], result["from"], result["until"]);
    DAOObject.createPrograms(program).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>{
        console.error(e);
        res.redirect("/Profile");
    });
});

router.post("/createReservation", (req, res)=>{
    let result = req.body;
    let online = true;
    if(result["online"] === ""){
        online = false;
    }
    let reservation = new Reservation(result["roomNumber"], result["start"], result["end"], online);
    DAOObject.createReservation(reservation).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>{
        console.error(e);
        res.redirect("/Profile");
    });
});

router.post("/createRoom", (req, res)=>{
    let result = req.body;
    let balcony = true;
    if(result["balcony"] === ""){
        balcony = false;
    }
    let room = new Room(result["roomNumber"], result["numberOfPeople"], balcony, result["bedsize"], result["type"]);
    DAOObject.createRoom(room).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>{
        console.error(e);
        res.redirect("/Profile");
    });
});

router.post("/createRoomType", (req, res)=>{
    let result = req.body;
    let aircon = true;
    if(result["airConditioner"] === ""){
        aircon = false;
    }
    let roomType = new RoomType(result["type"], result["bathroom"], aircon);
    console.log(roomType);
    DAOObject.createRoomType(roomType).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>{
        console.error(e);
        res.redirect("/Profile");
    });
});

router.post("/updateGuest", (req, res)=>{
    let result = req.body;
    DAOObject.updateGuest(result["lastname"], result["firstname"], result["email"], result["password"], parseInt(result["ID"])).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post("/updatePartakes", (req, res)=>{
    let result = req.body;
    let partakes = new Partakes(parseInt(result["ID"]), result["type"], result["from"], result["until"]);
    //console.log(partakes);
    //console.log(parseInt(result["prevID"]), result["type"], result["from"], result["until"]);
    DAOObject.deletePartakes(parseInt(result["prevID"]), result["type"], result["from"], result["until"]).then(()=>{
        DAOObject.createPartakes(partakes).then(()=>{
            res.redirect("/Profile");
        }).catch(e=>console.error(e));
    }).catch(e=>console.error(e));
});

router.post("/updateProgram", (req, res)=>{
    let result = req.body;
    let programs = new Programs(result["type"], result["from"], result["until"]);
    DAOObject.deletePrograms(result["prevType"], result["from"], result["until"]).then(()=>{
        DAOObject.createPrograms(programs).then(()=>{
            res.redirect("/Profile");
        }).catch(e=>console.error(e));
    }).catch(e=>console.error(e));
});

router.post("/updateReservation", (req, res)=>{
    let result = req.body;
    let online = true;
    if(result["online"] === ""){
        online = false;
    }
    let reservation = new Reservation(parseInt(result["roomNumber"]), result["start"], result["end"], online);
    DAOObject.deleteReservation(parseInt(result["prevRoomNumber"]), result["start"], result["end"]).then(()=>{
        DAOObject.createReservation(reservation).then(()=>{
            res.redirect("/Profile");
        }).catch(e=>console.error(e));
    }).catch(e=>console.error(e));
});

router.post("/updateRoom", (req, res)=>{
    let result = req.body;
    let balcony = true;
    if(result["balcony"] === ""){
        balcony = false;
    }
    DAOObject.updateRoom(parseInt(result["numberOfPeople"]), balcony, parseInt(result["bedsize"]), result["type"], parseInt(result["roomNumber"])).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post("/updateRoomType", (req, res)=>{
    let result = req.body;
    let aircon = true;
    if(result["airConditioner"] === ""){
        aircon = false;
    }
    DAOObject.updateRoomType(result["bathroom"], aircon, result["type"]).then(()=>{
        res.redirect("/Profile");
    }).catch(e=>console.error(e));
});

router.post('/auth', urlencodedParser, (req, res)=>{
    let ID = parseInt(req.body.ID);
    let password = req.body.password;
    if (ID && password) {
        req.session.loggedin = true;
        req.session.ID = ID;
        req.session.password = password;

    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
    res.redirect("/Profile");
});

router.get("/Logout", (req,res)=>{
    req.session.destroy();
    res.render("Login", {nonuser:"There is no such Guest!"});
});

router.post("/logout", (req,res)=>{
   req.session.destroy();
   res.redirect("/Login");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/Ejs"));
app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/");
});