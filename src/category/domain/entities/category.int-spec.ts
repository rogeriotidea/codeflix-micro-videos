import ValidationError from "../../../@seedwork/errors/validation-error";
import { Category } from "./category";

describe("Category Integration Tests", () => {
    describe("create method", () => {
        it('should a invalid category using name property', () => {

            expect(() => new Category({ name: null })).toThrow(new ValidationError('The name is required'));
    
            expect(() => new Category({ name: "" })).toThrow(new ValidationError('The name is required'));
    
            expect(() => new Category({ name: 5 as any })).toThrow(new ValidationError('The name must be a string'));
    
            expect(() => new Category({ name: "t".repeat(256) })).toThrow(new ValidationError('The name must be less or equal than 255 characteres'));
    
        }); 
    
    
        it('should a invalid category using description property', () => {
    
             expect(() => new Category({ name: 'testing', description: 5 as any })).toThrow(new ValidationError('The description must be a string'));
          
        }); 
    
        it('should a invalid category using is_active property', () => {
    
            expect(() => new Category({ name: 'testing', is_active: "" as any})).toThrow(new ValidationError('The is_active must be a boolean'));
         
        }); 

        it('should be a valid category', () => {

            expect.assertions(0);
            new Category({
                name: 'Movie',                
            });
            new Category({
                name: 'Movie',  
                description: 'some description'              
            });
            new Category({
                name: 'Movie',     
                description: null           
            });
            new Category({
                name: 'Movie',   
                description: 'some description',
                is_active: true             
            });
            new Category({
                name: 'Movie',   
                description: 'other description',    
                is_active: false         
            });           
        });
    });

    describe("update method", () => {
        it('should a invalid category using name property', () => {

            const category = new Category({ name: 'Movie' });
            expect(() => category.update(null, null)).toThrow(new ValidationError('The name is required'));

            expect(() => category.update("", "")).toThrow(new ValidationError('The name is required'));

            expect(() => category.update(5 as any, null)).toThrow(new ValidationError('The name must be a string'));

            expect(() => category.update("t".repeat(256), null)).toThrow(new ValidationError('The name must be less or equal than 255 characteres'));
       
        }); 
    
    
        it('should a invalid category using description property', () => {
             
             const category = new Category({ name: 'Movie' });
             expect(() => category.update("Teste", 5 as any )).toThrow(new ValidationError('The description must be a string'));
          
        });     


        it('should be a valid category', () => {

            expect.assertions(0);

            const category = new Category({ name: "Movie" });
            category.update('name', null);
            category.update('name', 'some description');            
           
        });
     
    })
})