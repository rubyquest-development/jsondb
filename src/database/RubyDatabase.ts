import * as fs from 'fs';
import { DatabaseSchema } from "../schemas";

type FilterFunction = (item: any) => boolean;

class RubyDatabase {
    private filename: string;
    private data: DatabaseSchema;

    /**
     * Creates a new instance of the database.
     * @param {string} filename - The name of the JSON file for the database.
     */
    constructor(filename: string) {
        this.filename = filename;
        this.data = this.loadDatabase();
    }

    private loadDatabase() : DatabaseSchema {
        try {
            const fileContents = fs.readFileSync(this.filename, "utf-8");
            return JSON.parse(fileContents);
        } catch (error) {
            console.error(`[RUBYDB] There was an error loading database from file: ${error}`)
            return {};
        }
    }

    private saveDatabase(): void {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.data));
        } catch (error) {
            console.error(`[RUBYDB] There was an error saving database: ${error}`)
        }
    }

    /**
     * Retrieves the collection data for the specified collection.
     * If the collection does not exist, an empty array is returned.
     * @param {string} collection - The name of the collection.
     * @returns {any[]} The collection data.
     */
    public getCollection(collection: string): any[] {
        if (!this.data[collection]) {
            this.data.collection = [];
        }

        return this.data[collection];
    }

    /**
     * Inserts an item into the specified collection.
     * @param {string} collection - The name of the collection.
     * @param {any} item - The item to insert.
     * @returns {void}
     */
    public insert(collection: string, item: any): void {
        const collectionData = this.getCollection(collection);
        collectionData.push(item);
        this.saveDatabase();
    }

    /**
     * Deletes items from the specified collection based on a filter function.
     * @param {string} collection - The name of the collection.
     * @param {FilterFunction} filter - The filter function.
     * @returns {void}
     */
    public delete(collection: string, filter: FilterFunction): void {
        const collectionData = this.getCollection(collection);
        const filteredData = collectionData.filter(filter);
        
        this.data[collection] = filteredData;
        this.saveDatabase();
    }

    /**
     * Deletes the entire collection.
     * @param {string} collection - The name of the collection to delete.
     * @returns {void}
     */
    public deleteCollection(collection: string): void {
        delete this.data[collection];
        this.saveDatabase();
    }
}

export { RubyDatabase }