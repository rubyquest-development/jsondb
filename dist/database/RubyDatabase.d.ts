type FilterFunction = (item: any) => boolean;
declare class RubyDatabase {
    private filename;
    private data;
    /**
     * Creates a new instance of the database.
     * @param {string} filename - The name of the JSON file for the database.
     */
    constructor(filename: string);
    private loadDatabase;
    private saveDatabase;
    /**
     * Retrieves the collection data for the specified collection.
     * If the collection does not exist, an empty array is returned.
     * @param {string} collection - The name of the collection.
     * @returns {any[]} The collection data.
     */
    getCollection(collection: string): any[];
    /**
     * Inserts an item into the specified collection.
     * @param {string} collection - The name of the collection.
     * @param {any} item - The item to insert.
     * @returns {void}
     */
    insert(collection: string, item: any): void;
    /**
     * Deletes items from the specified collection based on a filter function.
     * @param {string} collection - The name of the collection.
     * @param {FilterFunction} filter - The filter function.
     * @returns {void}
     */
    delete(collection: string, filter: FilterFunction): void;
    /**
     * Deletes the entire collection.
     * @param {string} collection - The name of the collection to delete.
     * @returns {void}
     */
    deleteCollection(collection: string): void;
}
export { RubyDatabase };
