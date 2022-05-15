import { Category } from "../../categories/shared/category.model";
import {BaseResouceModel} from "../../../shared/models/base-resource.model";

export class Entry extends BaseResouceModel {

    constructor(
        override id = 0,
        public name?: string,
        public description?: string,
        public type?: boolean | string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId: number = 0,     
        public categoryName?: string,
        public category?: Category        
    ) {super() }
    get types() : string {
       return this.type? 'Dispesas':'Receitas';
       
    }
    get paidText(): string {  
        return this.paid ? 'Pago': 'Pedente';
    }
    static formJson(jsonData: any): Entry{
        return Object.assign(new Entry, jsonData) ;   
    }
   /* get nameCategory():any {
        return this.category;
    }*/

}