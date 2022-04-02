import { Category } from "../../categories/shared/category.module";

export class Entry {

    constructor(
        public id = 0,
        public name?: string,
        public description?: string,
        public type?: boolean,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId: number = 0,     
        public categoryName?: string,
        public category?: Category        
    ) { }
    get types() : string {
       return this.type? 'Dispesas':'Receitas';
       
    }
    get paidText(): string {  
        return this.paid ? 'Pago': 'Pedente';
    }
   /* get nameCategory():any {
        return this.category;
    }*/

}