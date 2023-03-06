'use strict';

class List {
  constructor() {
    this.arr = [];
  }

  length() {
    return this.arr.length;
  }

  append(element) {
    this.arr.push(element);
  }

  insert(element, index) {
    this.arr.splice(index, 0, element);
  }

  delete(index) {
    if (index !== -1) this.arr.splice(index, 1);
  }

  deleteAll(element) {
    this.arr = this.arr.filter((elem) => elem !== element);
    return this.arr;
  }

  get(index) {
    return this.arr[index];
  }

  clone() {
    const clonedList = new List();
    this.arr.map((elem) => clonedList.append(elem));
    return clonedList;
  }

  reverse() {
    return this.arr.reverse();
  }

  findFirst(element) {
    return this.arr.findIndex((elem) => element === elem);
  }

  findLast(element) {
    return this.arr.lastIndexOf(element);
  }

  clear() {
    this.arr = [];
  }

  extend(elements) {
    elements.arr.map((elem) => this.append(elem));
  }
}


const list = new List();
console.log('list length:', list.length());

list.insert('1', 0);
list.append('2');
console.log('append', list.arr);

list.delete(1);
console.log('delete', list.arr);

list.append('2');
list.append('2');
list.append('2');
console.log('append 3 twos', list.arr);

list.deleteAll('2');
console.log('deleteAll 2', list.arr);

list.append('2');
list.append('3');
list.append('3');
list.append('2');
console.log('get element in list with index 0:', list.get(0));

const clonedList = list.clone();
console.log('cloned list: ', clonedList.arr);

console.log('reverse', clonedList.reverse());
console.log('findFirst', clonedList.findFirst('2'));
console.log('findLast', clonedList.findLast('2'));

clonedList.clear();
console.log('cleared list', clonedList.arr);

clonedList.append(1);
clonedList.extend(list);
console.log('extend', clonedList.arr);
