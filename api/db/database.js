import mysql from "mysql";
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lydia@12345",
    port: 3306,
    database: "masms"
});

con.connect(error => {
    if(error){
        console.log("Not Connected");
    }
    else{
        console.log("Connected!!");
    }
});

export default con;