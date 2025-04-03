import express from 'express';
import {TCategoryWithoutId} from "../type";
import fileDb from "../fileDb";
const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const categories = await fileDb.getCat();
    res.send(categories.map(item => {
        return {
            id: item.id,
            name: item.name
        }
    }));
});

categoriesRouter.get('/:id', async (req, res) => {
    const categories = await fileDb.getCat();
    const category = categories.find(item => item.id === req.params.id);

    if (!category) {
        res.sendStatus(404);
        return;
    }

    res.send(category);
});

categoriesRouter.post('/' , async (req, res) => {
    if (req.body.name.trim().length === 0) {
        res.status(400).send({'error': 'Fields required'});
        return;
    }

    const category: TCategoryWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };
    const savedCategory = await fileDb.addCat(category)

    res.send(savedCategory);
});

categoriesRouter.delete('/:id' , async (req, res) => {
    const id = req.params.id;
    await fileDb.deleteCat(id);
})

export default categoriesRouter;
