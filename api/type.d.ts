export interface  Category {
    id: string;
    name: string;
    description: string;
}

export type TCategoryWithoutId = Omit<Category, 'id'>