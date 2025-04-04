import express from 'express';
import {TCategoryWithoutId} from "../type";
import fileDb from "../fileDb";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const categories = await fileDb.getCategories();

    if (categories) {
        const categoriesList = categories.map(item => {
            return {
                id: item.id,
                name: item.name
            }
        })
        res.send(categoriesList)
    } else {
        res.sendStatus(404);
    }
});

categoriesRouter.get('/:id', async (req, res) => {
    const categories = await fileDb.getCategories();
    const category = categories.find(item => item.id === req.params.id);

    if (!category) {
        res.sendStatus(404);
        return;
    }

    res.send(category);
});

categoriesRouter.post('/', async (req, res) => {
    if (req.body.name.trim().length === 0) {
        res.status(400).send({'error': 'Field name required'});
        return;
    }

    const category: TCategoryWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };
    const savedCategory = await fileDb.addCategory(category)

    res.send(savedCategory);
});

categoriesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fileDb.deleteCategory(id);
    if (response) {
        res.send({ message: `Category was successfully deleted.` });
    } else {
        res.status(404).send({ message: `Category cannot be deleted` });
    }
})

export default categoriesRouter;
