import * as fs from 'fs';
import { DatabaseSchema } from "../schemas";

type FilterFunction = (item: any) => boolean;

class RubyDatabase {
    private filename: string;
    private data: DatabaseSchema;
    private prettify: boolean;

    /**
     * Creates a new instance of the database.
     * @param {string} filename - The name of the JSON file for the database.
     */
    constructor(filename: string, prettify: boolean = false) {
        this.filename = filename;
        this.prettify = prettify

        if (!fs.existsSync(this.filename)) {
            console.log("[RUBYDB] Database file does not exist! Creating with default values.")
            fs.writeFileSync(this.filename, JSON.stringify({ default: [{ key: "This is a default key.", value: "This is a default value." }] }));
        }

        this.data = this.loadDatabase();
    }

    private loadDatabase(): DatabaseSchema {
        try {
            const fileContents = fs.readFileSync(this.filename, "utf-8");
            return JSON.parse(fileContents);
        } catch (error) {
            console.log("[RUBYDB] There was an error when loading the database.")
            return {};
        }
    }

    private saveDatabase(): void {
        try {
          const jsonData = this.prettify ? JSON.stringify(this.data, null, 2) : JSON.stringify(this.data);
          fs.writeFileSync(this.filename, jsonData);
        } catch (error) {
          console.error(`[RUBYDB] There was an error saving database: ${error}`);
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
            // Create a new collection if it doesn't exist
            this.data[collection] = [];
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
        const existingIndex = collectionData.findIndex((existingItem) => existingItem.key === item.key);

        if (existingIndex !== -1) {
            // Overwrite existing item if the key already exists
            collectionData[existingIndex] = item;
        } else {
            collectionData.push(item);
        }

        this.saveDatabase();
    }

    /**
     * Deletes an item from the specified collection based on the key.
     * @param {string} collection - The name of the collection.
     * @param {string} field - The name of the dynamic key.
     * @param {string} key - The key of the item to delete.
     * @returns {void}
     */
    public delete(collection: string, field: string, key: string): void {
        const collectionData = this.getCollection(collection);
        const itemIndex = collectionData.findIndex((item) => item[field] === key);

        if (itemIndex !== -1) {
            collectionData.splice(itemIndex, 1);
            this.saveDatabase();
        }
    }

    /**
     * Queries the specified collection for an item with the given key.
     * @param {string} collection - The name of the collection.
     * @param {string} field - The name of the dynamic key.
     * @param {string} key - The key to search for.
     * @returns {any | undefined} The found item, or undefined if not found.
     */
    public query(collection: string, field: string, key: string) : any {
        const collectionData = this.getCollection(collection);
        return collectionData.find((item) => item[field] === key);
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

export { RubyDatabase };
