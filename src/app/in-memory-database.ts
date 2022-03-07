import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.module";
import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] =
            [
                { id: 1, name: 'Feminino', description: 'Roupas Femininas' },
                { id: 2, name: 'Maculino', description: 'Roupas Masculinas' },
                { id: 3, name: 'Infantil', description: 'Roupas Infantis' },
                { id: 4, name: 'Femino plus Size', description: ' Roupas Femininas Plus Size' },
                { id: 2, name: 'Maculino', description: 'Roupas Masculinas' },
                { id: 5, name: 'Masculino plus Size', description: 'Roupas masculinas plus Size' },
                { id: 6, name: 'Feminino', description: 'Roupas intímas femininas' }
            ]

        const entryes: Entry[] =
            [
                {
                    id: 1,
                    name: 'Camisa feminina',
                    categoryId: categories[0].id,
                    category: categories[0],
                    paid: true,
                    date: "10/02/2020",
                    amount: "100,00",
                    type: "expense",
                    description: "Camisa feminina branca",
                } as Entry,

                {
                    id: 2,
                    name: 'Camisa masculina',
                    categoryId: categories[1].id,
                    category: categories[1],         
                    paid: true,
                    date: "10/02/2020",
                    amount: "100,00",
                    type: "expense",
                    description: "Camisa masculina branca",
                } as Entry,
                {
                    id: 3,
                    name: 'Camisa infantil',
                    categoryId: categories[2].id,
                    category: categories[2],           
                    paid: false,
                    date: "10/02/2020",
                    amount: "100,00",
                    type: "revenue",
                    description: "Camisa masculina branca",
                } as Entry,

                {
                    id: 4,
                    name: 'Camisa feminina plus size',
                    categoryId: categories[3].id,
                    category: categories[3],          
                    paid: true,
                    date: "10/02/2020",
                    amount: "100,00",
                    type: "expense",
                    description: "Camisa feminina branca plus size",
                } as Entry,

                {
                    id: 5,
                    name: 'Camisa masculina plus size',
                    categoryId: categories[4].id,
                    category: categories[4],        
                    paid: false,
                    date: "10/02/2020",
                    amount: "100,00",
                    type: "revenue",
                    description: "Camisa masculina branca plus size",
                } as Entry,
                {
                    id: 6,
                    name: 'Langerie femininas',
                    categoryId: categories[5].id,
                    category: categories[5],         
                    paid: true,
                    date: "10/02/2020",
                    amount: "100,00",
                    type: "expense",
                    description: "langerie femininas branca",
                } as Entry,
            ]
        return { categories, entryes }
    }
}