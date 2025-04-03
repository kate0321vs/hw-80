import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";
import {Category, TCategoryWithoutId} from "./type";

const pathName = './db.json';
let CatData: { [key: string]: Category[] } = { "categories": [] };

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(pathName);
            CatData = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
            CatData = { "categories": [] };
        }
    },
    async getItems() {
        return CatData;
    },
    async addItem(item: TCategoryWithoutId) {
        const category = {
            ...item,
            id: randomUUID(),
        }
        CatData.categories.push(category);
        await this.save();
        return category;
    },
    async save() {
        await fs.writeFile(pathName, JSON.stringify(CatData));
    },
}

export default fileDb
