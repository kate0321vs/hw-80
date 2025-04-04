import express from 'express';
import {TItemsWithoutId} from "../type";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    const items = await fileDb.getItems();
    if (items) {
      const test = items.map(item => {
          console.log(items)
          return {
              id: item.id,
              name: item.name
          }
      })
        res.send(test);
}
    res.sendStatus(404);
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
    console.log('Uploaded file:', req.file);

    if (req.body.name.trim().length === 0) {
        res.status(400).send({'error': 'Field name required'});
        return;
    }
    console.log(req);
    const item: TItemsWithoutId = {
        name: req.body.name,
        description: req.body.description,
        id_location: req.body.id_location,
        id_category: req.body.id_category,
        image: req.file ? 'images/' + req.file.filename : null,
    };
    const savedItem = await fileDb.addItem(item)

    res.send(savedItem);
});




itemsRouter.delete('/:id' , async (req, res) => {
    const id = req.params.id;
    await fileDb.deleteItem(id);
    res.send(id);
})

export default itemsRouter;
