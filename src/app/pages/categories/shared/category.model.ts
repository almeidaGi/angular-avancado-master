import { BaseResouceModel } from "src/app/shared/models/base-resource.model";

export class Category extends BaseResouceModel {
    constructor(
        override id: number = 0,
        public name?: string,
        public description?: string
    ){super()}
    
    static formJson(jsonData: any): Category{
        return Object.assign(new Category, jsonData) ;   
    }
}
