'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modify = exports.find = exports.remove = exports.add = exports.list = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Read the contents of a collection
 * @param {string} collection The string name of the collection.
 */

var list = exports.list = function list(collection) {
    try {
        var result = _fs2.default.readFileSync('storage/' + collection + '.json', 'utf8');

        return JSON.parse(result);
    } catch (e) {
        return null;
    }
};

/**
 * Add a new object into a collection
 * @param {string} collection The string name of the collection.
 * @param {object} object The new object to add to the collection
 * @returns {*}
 */
/**
 * Interact with our storage
 */
var add = exports.add = function add(collection, object) {

    var arr = list(collection);
    arr.push(object);

    save(collection, arr);

    return object;
};

/**
 * Save an entire collection. This will overwrite the existing collection.
 * @param {string} collection The string name of the collection.
 * @param {Array} arr The new value of the entire collection.
 */
var save = function save(collection, arr) {
    // stringify array
    // write file
    _fs2.default.writeFileSync('storage/' + collection + '.json', JSON.stringify(arr, null, 4));
};

/**
 * Remove a single object from a collection
 * @param {string} collection The string name of the collection.
 * @param {string|number} id The id of the object to remove.
 * @returns {boolean} True if an item was removed, false if it was not found
 */
var remove = exports.remove = function remove(collection, id) {
    var arr = list(collection);
    var index = arr.findIndex(function (object) {
        return object.id == id;
    });
    var wasFound = index !== 1;

    if (wasFound) {
        arr.splice(index);
        save(collection, arr);
    }

    // index will be -1 if the index was not found in the array
    return index !== -1;
};

/**
 * Find a single object by id in a collection
 * @param {string} collection The string name of the collection.
 * @param {string|number} id The id of the object to remove.
 * @returns {object|undefined} Found object or undefined if not found.
 */
var find = exports.find = function find(collection, id) {
    var arr = list(collection);
    return arr.find(function (object) {
        return object.id == id;
    });
};

var modify = exports.modify = function modify(collection, id, object) {
    var arr = list(collection);
    var modObj = arr.find(function (obj) {
        return obj.id == id;
    });

    if (object.name !== null && object.name !== undefined) {
        modObj.name = object.name;
    }

    // { ...spread1, ...spread2 } || Object.assign()

    var index = arr.findIndex(function (obj) {
        return obj.id == id;
    });
    arr[index].name = modObj.name;

    save(collection, arr);

    return modObj.name;
};