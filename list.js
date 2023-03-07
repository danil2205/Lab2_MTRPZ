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
  }

  insert(element, index) {
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
  }
}

// Програма повинна містити демонстрацію використання усіх методів класу (у довільному порядку).
const list = new DoublyLinkedList();
list.insert(1, 0); // [1]
list.append(2); // [1, 2]
list.append(3); // [1, 2, 3}
list.append(4);
console.log('list length:', list.length());

list.delete(1); // [1, 3, 4]
console.log('delete', list);

list.append(2);
list.append(2);
list.append(2); // [1, 3, 4, 2, 2, 2]
list.deleteAll(2);
console.log('deleteAll 2', list);
console.log('get element in list with index 0:', list.get(0));

const clonedList = list.clone(); // [1, 3, 4]
console.log('cloned list: ', clonedList);

clonedList.reverse(); // [4, 3, 1]
console.log('reverse', clonedList);
clonedList.append(2);
clonedList.append(2); // [4, 3, 1, 2, 2]
console.log('findFirst', clonedList.findFirst('2'));
console.log('findLast', clonedList.findLast('2'));

clonedList.clear();
console.log('cleared list', clonedList);

clonedList.append(1);
clonedList.extend(list);
console.log('extend', clonedList);

module.exports = DoublyLinkedList;
