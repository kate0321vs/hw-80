import express from 'express';
import {TItemWithoutId} from "../type";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    const items = await fileDb.getItems();
    if (items) {
      const itemsList = items.map(item => {
          return {
              id: item.id,
              name: item.name,
              id_category: item.id_category,
              id_location: item.id_location,
          }
      })
        res.send(itemsList);
} else {
        res.sendStatus(404);
    }
});

itemsRouter.get('/:id', async (req, res) => {
    const items = await fileDb.getItems();
    const item = items.find(item => item.id === req.params.id);

    if (!item) {
        res.sendStatus(404);
        return;
    }

    res.send(item);
});


itemsRouter.post('/', imagesUpload.single('image') , async (req, res) => {

    if (req.body.name.trim().length === 0 || !req.body.id_category || !req.body.id_location) {
        res.status(400).send({'error': 'Fields name, category, location required'});
        return;
    }

    const item: TItemWithoutId = {
        name: req.body.name,
        description: req.body.description,
        id_location: req.body.id_location,
        id_category: req.body.id_category,
        image: req.file ? 'images/' + req.file.filename : null,
        datetime: req.body.datetime
    };
    const savedItem = await fileDb.addItem(item)

    res.send(savedItem);
});

itemsRouter.delete('/:id' , async (req, res) => {
    const id = req.params.id;
    await fileDb.deleteItem(id);
    res.send({message: 'item was deleted'});
})

export default itemsRouter;
