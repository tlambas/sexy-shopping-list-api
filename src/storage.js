/**
 * Interact with our storage
 */
import fs from 'fs'

/**
 * Read the contents of a collection
 * @param {string} collection The string name of the collection.
 */

export const list = (collection) => {
    try {
        const result = fs.readFileSync(`storage/${collection}.json`, 'utf8')

        return JSON.parse(result)
    } catch (e) {
        return null
    }

}

/**
 * Add a new object into a collection
 * @param {string} collection The string name of the collection.
 * @param {object} object The new object to add to the collection
 * @returns {*}
 */
export const add = (collection, object) => {

    const arr = list(collection)
    arr.push(object)

    save(collection, arr)

    return object
}

/**
 * Save an entire collection. This will overwrite the existing collection.
 * @param {string} collection The string name of the collection.
 * @param {Array} arr The new value of the entire collection.
 */
const save = (collection, arr) => {
    // stringify array
    // write file
    fs.writeFileSync(`storage/${collection}.json`, JSON.stringify(arr, null, 4))
}

/**
 * Remove a single object from a collection
 * @param {string} collection The string name of the collection.
 * @param {string|number} id The id of the object to remove.
 * @returns {boolean} True if an item was removed, false if it was not found
 */
export const remove = (collection, id) => {
    const arr = list(collection)
    const index = arr.findIndex((object) => object.id == id)
    const wasFound = index !== 1

    if (wasFound) {
        arr.splice(index)
        save(collection, arr);
    }

    // index will be -1 if the index was not found in the array
    return index !== -1
}

/**
 * Find a single object by id in a collection
 * @param {string} collection The string name of the collection.
 * @param {string|number} id The id of the object to remove.
 * @returns {object|undefined} Found object or undefined if not found.
 */
export const find = (collection, id) => {
    const arr = list(collection)
    return arr.find((object) => object.id == id)
}

export const modify = (collection, id, object) => {
    const arr = list(collection)
    const modObj = arr.find((obj) => obj.id == id)

    if(object.name !== null && object.name !== undefined) {
        modObj.name = object.name
    }

    // { ...spread1, ...spread2 } || Object.assign()

    const index = arr.findIndex((obj) => obj.id == id)
    arr[index].name = modObj.name

    save(collection, arr)

    return modObj.name
}