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

