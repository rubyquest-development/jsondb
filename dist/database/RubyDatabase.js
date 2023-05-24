"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubyDatabase = void 0;
const fs = require("fs");
class RubyDatabase {
    filename;
    data;
    /**
     * Creates a new instance of the database.
     * @param {string} filename - The name of the JSON file for the database.
     */
    constructor(filename) {
        this.filename = filename;
        this.data = this.loadDatabase();
    }
    loadDatabase() {
        try {
            const fileContents = fs.readFileSync(this.filename, "utf-8");
            return JSON.parse(fileContents);
        }
        catch (error) {
            console.error(`[RUBYDB] There was an error loading database from file: ${error}`);
            return {};
        }
    }
    saveDatabase() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.data));
        }
        catch (error) {
            console.error(`[RUBYDB] There was an error saving database: ${error}`);
        }
    }
    /**
     * Retrieves the collection data for the specified collection.
     * If the collection does not exist, an empty array is returned.
     * @param {string} collection - The name of the collection.
     * @returns {any[]} The collection data.
     */
    getCollection(collection) {
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
    insert(collection, item) {
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
    delete(collection, filter) {
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
    deleteCollection(collection) {
        delete this.data[collection];
        this.saveDatabase();
    }
}
exports.RubyDatabase = RubyDatabase;
//# sourceMappingURL=RubyDatabase.js.map