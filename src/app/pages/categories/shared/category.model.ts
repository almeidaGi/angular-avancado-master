import { baseResouceModel } from "src/app/shared/models/base-resource.model";

export class Category extends baseResouceModel {
    constructor(
        override id?: number,
        public name?: string,
        public description?: string
    ){super()}
    
    static formJson(jsonData: any): Category{
        return Object.assign(new Category, jsonData) ;   
    }
}
