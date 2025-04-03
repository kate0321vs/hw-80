import express from "express";
import fileDb from "./fileDb";
import categoriesRouter from "./routers/categories";
import locationsRouter from "./routers/locations";

const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/locations', locationsRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

run().catch((err) => console.error(err));