const express = require("express")
const config = require("../config");

const Io = require("./utils/Io")
const Users = new Io(process.cwd()+"/database/users.json")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(process.cwd() + "/src/public"))

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.get("/" , (req, res) => {
    res.render("index.ejs")
})

app.get("/login" , (req, res) => {
    res.render("login.ejs")
})

app.get("/register" , (req, res) => {
    res.render("register.ejs")
})

app.get("/create", (req, res) =>{
    res.render("create.ejs")
})

app.get("/videos",(req, res) =>{
    res.render("videos.ejs")
})

app.post("/api/auth/login", async (req, res) =>{
    const {email, password} = req.body;

    const users = await Users.read();

    const user = users.find((user) => user.email === email);
    if(!user) return res.redirect("/register");

    const compare = user.password === password;
    if(!compare) return res.redirect("/register")


    res.redirect("/create")
})
app.listen(config.port, () =>{
   console.log(config.port);  
})