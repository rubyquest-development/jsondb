declare class RubyDatabase {
    private filename;
    private data;
    private prettify;
    /**
     * Creates a new instance of the database.
     * @param {string} filename - The name of the JSON file for the database.
     */
    constructor(filename: string, prettify?: boolean);
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
     * Deletes an item from the specified collection based on the key.
     * @param {string} collection - The name of the collection.
     * @param {string} field - The name of the dynamic key.
     * @param {string} key - The key of the item to delete.
     * @returns {void}
     */
    delete(collection: string, field: string, key: string): void;
    /**
     * Queries the specified collection for an item with the given key.
     * @param {string} collection - The name of the collection.
     * @param {string} field - The name of the dynamic key.
     * @param {string} key - The key to search for.
     * @returns {any | undefined} The found item, or undefined if not found.
     */
    query(collection: string, field: string, key: string): any;
    /**
     * Deletes the entire collection.
     * @param {string} collection - The name of the collection to delete.
     * @returns {void}
     */
    deleteCollection(collection: string): void;
}
export { RubyDatabase };
