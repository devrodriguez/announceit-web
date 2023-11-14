import { Category } from "./category";

export interface Store {
    id?: string;
    name: string;
    email: string;
    category: Category;
    urlImages: string[];
    address: string;
    phoneNumber: string;
    description: string;
    geoLocation?: any;
}
