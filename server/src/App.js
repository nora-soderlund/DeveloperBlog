import Server from "./Server.js";
import Database from "./Database.js";

import config from "./../config.json" assert { type: "json" };

import "./API/v1/Articles.js";

import "./API/v1/Article.js";
import "./API/v1/Article/Feedback.js";

Database.connect();

Server.listen(config.port);
