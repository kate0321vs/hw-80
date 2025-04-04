import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";
import {Category, IItems, ILocation, TCategoryWithoutId, TItemsWithoutId, TLocationWithoutId,} from "./type";
import {existsSync} from "node:fs";

const pathName = './db.json';
let data: { categories: Category[], locations: ILocation[], items: IItems[] } = {
    categories: [],
    locations: [],
    items: []};

const fileDb = {
    async init() {
        try {
            if(existsSync(pathName)) {
                await fs.writeFile(pathName, JSON.stringify(data));
            } else {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
            }
        } catch (e) {
            console.error(e);
            data = { categories: [], locations: [], items: [] };
        }
    },
    async getCat() {
        return data.categories;
    },
    async getLoc() {
        return data.locations;
    },
    async getItems() {
        if (data.items) {
            return data.items;
        } return []
    },

    async addCat(item: TCategoryWithoutId) {
        const category = {
            ...item,
            id: randomUUID(),
        }
        data.categories.push(category);
        await this.save();
        return category;
    },
    async addLoc(item: TLocationWithoutId) {
        const location = {
            ...item,
            id: randomUUID(),
        }
        data.locations.push(location);
        await this.save();
        return location;
    },
    async addItem(item: TItemsWithoutId) {
        console.log(item)
        const addedItem = {
            ...item,
            id: randomUUID(),
            date: new Date().toISOString(),
        }
        data.items.push(addedItem);
        await this.save();
        return addedItem;
    },

    async deleteCat(id: string) {
        data.categories = data.categories.filter(category => category.id !== id);
        await this.save();
    },
    async deleteLoc(id: string) {
        data.locations = data.locations.filter(location => location.id !== id);
        await this.save();
    },
    async deleteItem(id: string) {
        data.items = data.items.filter(item => item.id !== id);
        await this.save();
    },

    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb
