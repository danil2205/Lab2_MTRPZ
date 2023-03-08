'use strict'
const assert = require('assert');
const DoublyLinkedList = require('./list');

{ // Test the method length()
  const listTest = new DoublyLinkedList();
  assert.strictEqual(listTest.length(), 0); // []

  listTest.append('a');
  assert.strictEqual(listTest.length(), 1);

  listTest.append('b');
  assert.strictEqual(listTest.length(), 2);

  listTest.delete(0); // ['b']
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

  listTest.append('a').append('b');
  assert.strictEqual(listTest.get(0), 'a');
  assert.strictEqual(listTest.get(1), 'b');

  try {
    listTest.get(505);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }
}

{ // Test the method append()
  const listTest = new DoublyLinkedList();
  listTest.append('a')
    .append('b')
    .append('c')
    .append('d'); // ['a', 'b', 'c', 'd']

  assert.strictEqual(listTest.length(), 4);
  assert.strictEqual(listTest.get(0), 'a');
  assert.strictEqual(listTest.get(3), 'd');
}

{ // Test the method insert()
  const listTest = new DoublyLinkedList();

  listTest.insert('c', 0) // ['c']
    .insert('a', 0) // ['a', 'c']
    .insert('d', 2) // ['a', 'c' 'd']
    .insert('b', 1); // ['a', 'b', 'c', 'd']

  assert.strictEqual(listTest.length(), 4);
  assert.strictEqual(listTest.get(0), 'a');
  assert.strictEqual(listTest.get(1), 'b');

  try {
    listTest.insert('sdfasdf', 228);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }
}

{ // Test the method delete()
  const listTest = new DoublyLinkedList();

  listTest.insert('a', 0).delete(0);
  assert.strictEqual(listTest.head, null);

  listTest.insert('a', 0) // ['a']
    .insert('b', 1) // ['a', 'b']
    .insert('c', 2) // ['a', 'b', 'c']
    .delete(1); // ['a', 'c']
  assert.strictEqual(listTest.get(1), 'c');

  try {
    listTest.delete(-1);
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    assert.strictEqual(error.message, 'Invalid index');
  }
}

{ // Test the method deleteAll()
  const listTest = new DoublyLinkedList();
  listTest.append('a').deleteAll('a');
  assert.strictEqual(listTest.head, null);

  listTest.append('a') // ['a']
    .append('b') // ['a', 'b']
    .deleteAll('a'); // ['b']
  assert.strictEqual(listTest.length(), 1);
  assert.strictEqual(listTest.head.data, 'b');

  listTest.append('a') // ['b', 'a']
    .append('d') // ['b', 'a', 'd']
    .append('e') // ['b', 'a', 'd', 'e']
    .deleteAll('e') // ['b', 'a', 'd']
    .deleteAll('poop') // ['b', 'a', 'd']
  assert.strictEqual(listTest.length(), 3);
  assert.strictEqual(listTest.tail.data, 'd');

  listTest.insert('a', 1) // ['b', 'a', 'a', 'd']
    .append('o') // ['b', 'a', 'a', 'd', 'o']
    .deleteAll('a') // ['b', 'd', 'o']
  assert.strictEqual(listTest.length(), 3);
  assert.strictEqual(listTest.get(1), 'd');
}

{ // Test the method clone()
  const listTest = new DoublyLinkedList();
  listTest.append('a').append('hihihaha');
  const clonedList = listTest.clone();
  assert.deepStrictEqual(clonedList, listTest);
}

{ // Test the method reverse()
  const listTest = new DoublyLinkedList();
  listTest.append('d')
    .append('c')
    .append('b')
    .append('a'); // ['d', 'c', 'b', 'a']

  listTest.reverse(); // ['a', 'b', 'c', 'd']
  assert.strictEqual(listTest.get(0), 'a');
  assert.strictEqual(listTest.get(3), 'd');
}

{ // Test the method findFirst()
  const listTest = new DoublyLinkedList();

  listTest.append('a')
    .append('b')
    .append('c')
    .append('c')
    .append('a'); // ['a', 'b', 'c', 'c', 'a']

  assert.strictEqual(listTest.findFirst('c'), 2);
  assert.strictEqual(listTest.findFirst('a'), 0);
  assert.strictEqual(listTest.findFirst('skibidi'), -1);
}

{ // Test the method findLast()
  const listTest = new DoublyLinkedList();

  listTest.append('a')
    .append('b')
    .append('c')
    .append('c')
    .append('a'); // ['a', 'b', 'c', 'c', 'a']

  assert.strictEqual(listTest.findLast('c'), 3);
  assert.strictEqual(listTest.findLast('a'), 4);
  assert.strictEqual(listTest.findLast('yesyes'), -1);
}

{ // Test the method clear()
  const listTest = new DoublyLinkedList();
  listTest.append('a').append('b') // ['a', 'b']
  listTest.clear(); // []
  assert.strictEqual(listTest.length(), 0);
  assert.strictEqual(listTest.head, null);
}

{ // Test the method extend()
  const listTest = new DoublyLinkedList();
  listTest.append('a'); // ['a']

  const extendListTest = new DoublyLinkedList();
  extendListTest.append('b').append('c'); // ['b', 'c']

  listTest.extend(extendListTest); // ['a'] + ['b', 'c'] = ['a', 'b', 'c']
  extendListTest.append('nope'); // При цьому подальші зміни в другий список не повинні впливати на перший.
  assert.strictEqual(listTest.length(), 3);
  assert.strictEqual(listTest.get(0), 'a');
  assert.strictEqual(listTest.get(1), 'b');
}
