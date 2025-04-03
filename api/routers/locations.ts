import express from 'express';
import {TLocationWithoutId} from "../type";
import fileDb from "../fileDb";
const locationsRouter = express.Router();

locationsRouter.get('/', async (req, res) => {
    const locations = await fileDb.getLoc();
    res.send(locations.map(item => {
        return {
            id: item.id,
            name: item.name
        }
    }));
});

locationsRouter.get('/:id', async (req, res) => {
    const locations = await fileDb.getLoc();
    const location = locations.find(item => item.id === req.params.id);

    if (!location) {
        res.sendStatus(404);
        return;
    }

    res.send(location);
});

locationsRouter.post('/' , async (req, res) => {
    if (req.body.name.trim().length === 0) {
        res.status(400).send({'error': 'Fields name required'});
        return;
    }

    const location: TLocationWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };
    const savedLocation = await fileDb.addLoc(location)

    res.send(savedLocation);
});

locationsRouter.delete('/:id' , async (req, res) => {
    const id = req.params.id;
    await fileDb.deleteLoc(id);
    res.send(id);
})

export default locationsRouter;
