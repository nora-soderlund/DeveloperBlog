import Server from "./Server.js";
import Database from "./Database.js";

import "./API/v1/Articles.js";
import "./API/v1/Article.js";

Database.connect();

Server.listen(3001);
