'use strict';

const createNewNode = (element) => {
  return {
    data: element,
    prev: null,
    next: null
  };
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.lengthList = 0;
  }

  length() {
    return this.lengthList;
  }

  append(element) {
    if (typeof element !== 'string') return;
    const newNode = createNewNode(element);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.lengthList++;
    return this;
  }

  insert(element, index) {
    if (typeof element !== 'string') return;
    if (index < 0 || index > this.lengthList) {
      throw new Error('Invalid index');
    }
    const newNode = createNewNode(element);
    if (index === 0) {
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    } else if (index === this.lengthList) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      newNode.prev = current;
      newNode.next = current.next;
      current.next.prev = newNode;
      current.next = newNode;
    }
    this.lengthList++;
    return this;
  }

  delete(index) {
    if (index < 0 || index > this.lengthList) {
      throw new Error('Invalid index');
    }
    let deletedNode = null;
    if (this.lengthList === 1) {
      deletedNode = this.head;
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      deletedNode = this.head;
      this.head = this.head.next;
      this.head.prev = null;
    } else if (index === this.lengthList - 1) {
      deletedNode = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      deletedNode = current;
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }
    this.lengthList--;
    return deletedNode.data;
  }

  deleteAll(element) {
    let current = this.head;
    let deletedCount = 0;
    while (current) {
      if (current.data === element) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = current.next;
          this.head.prev = null;
        } else if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        deletedCount++;
      }
      current = current.next;
    }
    this.lengthList -= deletedCount;
    return this;
  }

  get(index) {
    if (index < 0 || index > this.lengthList || !this.lengthList) {
      throw new Error('Invalid index');
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  clone() {
    const newList = new DoublyLinkedList();
    let current = this.head;
    while (current) {
      newList.append(current.data);
      current = current.next;
    }
    return newList;
  }

  reverse() {
    let current = this.head;
    let prev = null;
    while (current) {
      const next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }
    this.tail = this.head;
    this.head = prev;
    return this;
  }

  findFirst(element) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.data === element) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }
    return -1;
  }

  findLast(element) {
    let current = this.tail;
    let index = this.lengthList - 1;
    while (current) {
      if (current.data === element) return index;
      current = current.prev;
      index--;
    }
    return -1;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.lengthList = 0;
  }

  extend(list) {
    let current = list.head;
    while (current) {
      this.append(current.data);
      current = current.next;
    }
    return this;
  }
}

// Програма повинна містити демонстрацію використання усіх методів класу (у довільному порядку).
const list = new DoublyLinkedList();
list.insert('a', 0) // ['a']
  .append('b') // ['a', 'b']
  .append('c') // ['a', 'b', 'c']
  .append('d') // ['a', 'b', 'c', 'd']
console.log('list length:', list.length());

list.delete(1); // ['a', 'c', 'd']
console.log('delete', list);

list.append('b')
  .append('b')
  .append('b') // ['a', 'c', 'd', 'b', 'b', 'b']
  .deleteAll('b'); // ['a', 'c', 'd']
console.log('deleteAll b', list);
console.log('get element in list with index 0:', list.get(0));

const clonedList = list.clone(); // ['a', 'c', 'd']
console.log('cloned list: ', clonedList);

clonedList.reverse(); // ['d', 'c', 'a']
console.log('reverse', clonedList);
clonedList.append('b').append('b'); // ['d', 'c', 'a', 'b', 'b']
console.log('findFirst', clonedList.findFirst('b'));
console.log('findLast', clonedList.findLast('b'));

clonedList.clear(); // []
console.log('cleared list', clonedList);

clonedList.append('a').extend(list); // ['a'] +  ['a', 'c', 'd']
console.log('extend', clonedList);

module.exports = DoublyLinkedList;
