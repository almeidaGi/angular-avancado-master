import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.module";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category [] = 
        [
            {id:1, name:'Saia', description: 'Saia Midi'},            
            {id:2, name:'Calças', description: 'Calças Jeans'},            
            {id:3, name:'Top', description: 'Top Viscose'},
            {id:4, name:'shorts', description: 'Shorts feminino Jeans'} ,              
            {id:4, name:'Calças', description: 'Viscose'}
        ]
        return {categories}
    }
}