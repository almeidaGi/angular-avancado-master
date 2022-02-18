import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.module";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category []= 
        [
            {id:1, name:'Saia', description: 'Saia Midi'},            
            {id:2, name:'Calças', description: 'Calças Jeans'},            
            {id:3, name:'Top', description: 'Top Viscose'},
        ]
        return {categories}
    }
}