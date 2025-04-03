import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";
import {Category, ILocation, TCategoryWithoutId, TLocationWithoutId} from "./type";

const pathName = './db.json';
let data: { categories: Category[], locations: ILocation[] } = {
    categories: [],
    locations: []};

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
            data = { categories: [], locations: [] };
        }
    },
    async getCat() {
        return data.categories;
    },
    async getLoc() {
        return data.locations;
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

    async deleteCat(id: string) {
        data.categories = data.categories.filter(category => category.id !== id);
        await this.save();
    },
    async deleteLoc(id: string) {
        data.locations = data.locations.filter(location => location.id !== id);
        await this.save();
    },

    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb
