import express from "express";
import env from 'dotenv';

import {routes} from "../config/routes";

import web from "../routes/web";
import api from "../routes/api";

// Create our Express application
var app = express();

var port = process.env.PORT || 5050;

var publix = __dirname.substring(0, __dirname.length-3) + 'public';

app.use(express.static(publix));

app.use('/', routes(web));

app.use('/api', routes(api));

app.set("view engine", "ejs");

// Start the server

app.listen(port, (err) => {
    
    console.log('🌍 kasfy development server started on http://127.0.0.1:'+ port);
});


/* The NodeJS Framework for Smart Back-End
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| |  ___  ____   | || |      __      | || |    _______   | || |  _________   | || |  ____  ____  | |
| | |_  ||_  _|  | || |     /  \     | || |   /  ___  |  | || | |_   ___  |  | || | |_  _||_  _| | |
| |   | |_/ /    | || |    / /\ \    | || |  |  (__ \_|  | || |   | |_  \_|  | || |   \ \  / /   | |
| |   |  __'.    | || |   / ____ \   | || |   '.___`-.   | || |   |  _|      | || |    \ \/ /    | |
| |  _| |  \ \_  | || | _/ /    \ \_ | || |  |`\____) |  | || |  _| |_       | || |    _|  |_    | |
| | |____||____| | || ||____|  |____|| || |  |_______.'  | || | |_____|      | || |   |______|   | |
| |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 
Author : S.Katheeskumar [https://katheesh.github.io]*/ 