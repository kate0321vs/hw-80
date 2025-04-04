import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";
import {Category, IItems, ILocation, TCategoryWithoutId, TItemWithoutId, TLocationWithoutId,} from "./type";
import {existsSync} from "node:fs";

const pathName = './db.json';
let data: { categories: Category[], locations: ILocation[], items: IItems[] } = {
    categories: [],
    locations: [],
    items: []};

const fileDb = {
    async init() {
        try {
            if(!existsSync(pathName)) {
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
    async getCategories() {
        if (data.categories) {
            return data.categories;
        } return []
    },
    async getLocations() {
        if (data.locations) {
            return data.locations;
        } return []
    },
    async getItems() {
        if (data.items) {
            return data.items;
        } return []
    },

    async addCategory(item: TCategoryWithoutId) {
        const category = {
            ...item,
            id: randomUUID(),
        }
        data.categories.push(category);
        await this.save();
        return category;
    },
    async addLocation(item: TLocationWithoutId) {
        const location = {
            ...item,
            id: randomUUID(),
        }
        data.locations.push(location);
        await this.save();
        return location;
    },
    async addItem(item: TItemWithoutId) {
        const addedItem = {
            ...item,
            id: randomUUID(),
            datetime: new Date().toISOString(),
        }
        data.items.push(addedItem);
        await this.save();
        return addedItem;
    },

    async deleteCategory(id: string) {
        const deletedCategory = data.categories.filter(category => category.id === id);

        if (deletedCategory.length === 0) {
            return false;
        }

        const usedCategory = data.items.filter(item => item.id_category === deletedCategory[0].id);
        if (usedCategory.length > 0) {
            return false;
        }

        data.categories = data.categories.filter(item => item.id !== id);
        await this.save();
        return true;
    },

    async deleteLocation(id: string) {
        const deletedLocation = data.locations.filter(location => location.id === id);

        if (deletedLocation.length === 0) {
            return false;
        }

        const usedLocation = data.items.filter(item => item.id_location === deletedLocation[0].id);
        if (usedLocation.length > 0) {
            return false;
        }

        data.locations = data.locations.filter(item => item.id !== id);
        await this.save();
        return true;
    },

    async deleteItem(id: string) {
        data.items = data.items.filter(item => item.id === id);
        await this.save();
    },

    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb
