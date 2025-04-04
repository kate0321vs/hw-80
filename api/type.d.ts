export interface  Category {
    id: string;
    name: string;
    description: string;
}

export type TCategoryWithoutId = Omit<Category, 'id'>

export interface ILocation {
    id: string;
    name: string;
    description: string;
}

export type TLocationWithoutId = Omit<ILocation, 'id'>

export interface IItems {
    id: string;
    id_location: string;
    id_category: string;
    name: string;
    description: string;
    image: string | null;
    datetime: string;
}

export type TItemsWithoutId = Omit<IItems, 'id', 'datetime'>

