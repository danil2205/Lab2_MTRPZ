'use strict'
const assert = require('assert');
const DoublyLinkedList = require('./list');

{ // Test the method length()
  const listTest = new DoublyLinkedList();
  assert.strictEqual(listTest.length(), 0); // []

  listTest.append(1); // [1]
  assert.strictEqual(listTest.length(), 1);

  listTest.append(2); // [1, 2]
  assert.strictEqual(listTest.length(), 2);

  listTest.delete(0); // [2]
  assert.strictEqual(listTest.length(), 1);
}

{ // Test the method get()
  const listTest = new DoublyLinkedList();

  try {
    listTest.get(0);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }

  listTest.append(1); // [1]
  listTest.append(2); // [1, 2]

  assert.strictEqual(listTest.get(0), 1);
  assert.strictEqual(listTest.get(1), 2);

  try {
    listTest.get(505);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }
}

{ // Test the method append()
  const listTest = new DoublyLinkedList();
  listTest.append(1); // [1]
  listTest.append(3); // [1, 3]
  listTest.append(3); // [1, 3, 3]
  listTest.append(7); // [1, 3, 3, 7]

  assert.strictEqual(listTest.length(), 4);
  assert.strictEqual(listTest.get(0), 1);
  assert.strictEqual(listTest.get(3), 7);
}

{ // Test the method insert()
  const listTest = new DoublyLinkedList();

  listTest.insert(2, 0); // [2]
  listTest.insert(3, 0); // [3, 2]
  listTest.insert(5, 2); // [3, 2, 5]
  listTest.insert(4, 1); // [3, 4, 2, 5]

  assert.strictEqual(listTest.length(), 4);
  assert.strictEqual(listTest.get(0), 3);
  assert.strictEqual(listTest.get(1), 4);

  try {
    listTest.insert(2, 228);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }
}

{ // Test the method delete()
  const listTest = new DoublyLinkedList();

  listTest.insert(2, 0); // [2]
  listTest.delete(0); // []
  assert.strictEqual(listTest.head, null);

  listTest.insert(3, 0); // [3]
  listTest.insert(89, 1); // [3, 89]
  listTest.insert(123, 2); // [3, 89, 123]
  listTest.delete(1); // [3]
  assert.strictEqual(listTest.get(1), 123);

  try {
    listTest.delete(-1);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }
}

{ // Test the method deleteAll()
  const listTest = new DoublyLinkedList();
  listTest.append(1); // [1]
  listTest.deleteAll(1); // []
  assert.strictEqual(listTest.head, null);

  listTest.append(1); // [1]
  listTest.append(8); // [1, 8]
  listTest.deleteAll(1); // [8]
  assert.strictEqual(listTest.length(), 1);
  assert.strictEqual(listTest.head.data, 8);

  listTest.append(1); // [8, 1]
  listTest.append(7); // [8, 1, 7]
  listTest.append(3); // [8, 1, 7, 3]
  listTest.deleteAll(3); // [8, 1, 7]
  listTest.deleteAll(1337) // [8, 1, 7]
  assert.strictEqual(listTest.length(), 3);
  assert.strictEqual(listTest.tail.data, 7);

  listTest.insert(1, 1); // [8, 1, 1, 7]
  listTest.append(10); // [8, 1, 1, 7, 10]
  listTest.deleteAll(1) // [8, 7, 10]
  assert.strictEqual(listTest.length(), 3);
  assert.strictEqual(listTest.get(1), 7);
}

{ // Test the method clone()
  const listTest = new DoublyLinkedList();
  listTest.append(1); // [1]
  listTest.append(7); // [1, 7]
  const clonedList = listTest.clone();
  assert.deepStrictEqual(clonedList, listTest);
}

{ // Test the method reverse()
  const listTest = new DoublyLinkedList();
  listTest.append(7); // [7]
  listTest.append(3); // [7, 3]
  listTest.append(3); // [7, 3, 3]
  listTest.append(1); // [7, 3, 3, 1]

  listTest.reverse(); // [1, 3, 3, 7]
  assert.strictEqual(listTest.get(0), 1);
  assert.strictEqual(listTest.get(3), 7);
}

{ // Test the method findFirst()
  const listTest = new DoublyLinkedList();

  listTest.append(8);
  listTest.append(3);
  listTest.append(2);
  listTest.append(2);
  listTest.append(8); // [8, 3, 2, 2, 8]

  assert.strictEqual(listTest.findFirst(2), 2);
  assert.strictEqual(listTest.findFirst(8), 0);
  assert.strictEqual(listTest.findFirst(228), -1);
}

{ // Test the method findLast()
  const listTest = new DoublyLinkedList();

  listTest.append(8);
  listTest.append(3);
  listTest.append(2);
  listTest.append(2);
  listTest.append(8); // [8, 3, 2, 2, 8]

  assert.strictEqual(listTest.findLast(2), 3);
  assert.strictEqual(listTest.findLast(8), 4);
  assert.strictEqual(listTest.findLast(228), -1);
}

{ // Test the method clear()
  const listTest = new DoublyLinkedList();
  listTest.append(8);
  listTest.append(3); // [8, 3]

  listTest.clear(); // []
  assert.strictEqual(listTest.length(), 0);
  assert.strictEqual(listTest.head, null);
}

{ // Test the method extend()
  const listTest = new DoublyLinkedList();
  listTest.append(2); // [2]

  const extendListTest = new DoublyLinkedList();
  extendListTest.append(3);
  extendListTest.append(4); // [3, 4]

  listTest.extend(extendListTest); // [2] + [3, 4] = [2, 3, 4]
  extendListTest.append(1337); // При цьому подальші зміни в другий список не повинні впливати на перший.
  assert.strictEqual(listTest.length(), 3);
  assert.strictEqual(listTest.get(0), 2);
  assert.strictEqual(listTest.get(1), 3);
}
