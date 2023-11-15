import express from "express";
import router from "./consts/routes.const.js";
import cookieParser from "cookie-parser";
// import bp from "body-parser";
import { mongo_connection } from "./mongo-connection/mongoConnection.js";
const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/public/", express.static("./public"));
app.use(cookieParser());
// app.use(bp.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, async () => {
  console.log("Server is up and running.");
  await mongo_connection();
});
