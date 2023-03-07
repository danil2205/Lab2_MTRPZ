'use strict'
const assert = require('assert');
const List = require('./list');

const listTest = new List();

// Test the method length()
assert.strictEqual(listTest.length(), 0); // []

listTest.append(1); // [1]
assert.strictEqual(listTest.length(), 1);

listTest.append(2); // [1, 2]
assert.strictEqual(listTest.length(), 2);

listTest.delete(0); // [2]
assert.strictEqual(listTest.length(), 1);

// Test the method append()
listTest.append(3); // [2, 3]
assert.strictEqual(listTest.get(1), 3);

// Test the method insert()
listTest.insert(4, 1); // [2, 4, 3]
assert.strictEqual(listTest.get(1), 4);

// Test the method delete()
listTest.delete(1); // [2, 3]
assert.strictEqual(listTest.get(1), 3);

// Test the method deleteAll()
listTest.append(1); // [2, 3, 1]
listTest.append(8); // [2, 3, 1, 8]
listTest.append(1); // [2, 3, 1, 8, 1]
listTest.deleteAll(1); // [2, 3, 8]
assert.strictEqual(listTest.length(), 3);
assert.strictEqual(listTest.get(0), 2);

// Test the method get()
assert.strictEqual(listTest.get(0), 2);
assert.strictEqual(listTest.get(1), 3);

// Test the method clone()
const clonedList = listTest.clone();
assert.deepStrictEqual(clonedList.arr, listTest.arr);

// Test the method reverse()
listTest.reverse(); // [8, 3, 2]
assert.strictEqual(listTest.get(0), 8);
assert.strictEqual(listTest.get(1), 3);

// Test the method findFirst()
listTest.append(2); // [8, 3, 2, 2]
listTest.append(2); // [8, 3, 2, 2, 2]
assert.strictEqual(listTest.findFirst(2), 2);
assert.strictEqual(listTest.findFirst(3), 1);

// Test the method findLast()
assert.strictEqual(listTest.findLast(2), 4);

// Test the method clear()
listTest.clear(); // []
assert.strictEqual(listTest.length(), 0);

// Test the method extend()
const extendListTest = new List();
extendListTest.append(3); // [3]
extendListTest.append(4); // [3, 4]
listTest.append(2); // [2]
listTest.extend(extendListTest); // [2] + [3, 4] = [2, 3, 4]
assert.strictEqual(listTest.length(), 3);
assert.strictEqual(listTest.get(0), 2);
assert.strictEqual(listTest.get(1), 1337);
