import express from "express";

const app = express();

app.listen(5001, () => console.log("api running in 5001"));

app.get("/", (res, req) => res.json("MY API WORKING"));
