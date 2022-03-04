import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.module";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category [] = 
        [
            {id:1, name:'Saia', description: 'Saia Midi'},            
            {id:2, name:'Calça', description: 'Calças Jeans'},            
            {id:3, name:'Top', description: 'Top Viscose'},
            {id:4, name:'Shorts', description: 'Shorts feminino Jeans'} ,              
            {id:5, name:'Calça', description: 'Viscose'},
            {id:6, name:'Calça', description: 'Moletom'}
        ]
        return {categories}
    }
}