import express from 'express';
import {TLocationWithoutId} from "../type";
import fileDb from "../fileDb";

const locationsRouter = express.Router();

locationsRouter.get('/', async (req, res) => {
    const locations = await fileDb.getLocations();

    if (locations) {
        const locationsList = locations.map(item => {
            return {
                id: item.id,
                name: item.name
            }
        })
        res.send(locationsList);
    } else {
        res.sendStatus(404);
    }
});

locationsRouter.get('/:id', async (req, res) => {
    const locations = await fileDb.getLocations();
    const location = locations.find(item => item.id === req.params.id);

    if (!location) {
        res.sendStatus(404);
        return;
    }

    res.send(location);
});

locationsRouter.post('/', async (req, res) => {
    console.log(req.body);

    if (req.body.name.trim().length === 0) {
        res.status(400).send({'error': 'Fields name required'});
        return;
    }

    const location: TLocationWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };
    const savedLocation = await fileDb.addLocation(location)

    res.send(savedLocation);
});

locationsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fileDb.deleteLocation(id);
    if (response) {
        res.send({ message: `Location was successfully deleted.` });
    } else {
        res.status(404).send({ message: `Location cannot be deleted` });
    }
})

export default locationsRouter;
