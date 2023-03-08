# Lab 2 — Unit tests. CI

## Description
This application implements work with a typed list, which was first created by a list based on built-in arrays/lists, then rewritten on a doubly linked list. A linked list is a data structure that consists of nodes linked together and contains information about neighboring nodes. A singly linked list contains information about itself and the next element, while a doubly linked list contains data and references to the next and previous elements.

## Variant Calculation
The variant is determined by the remainder of dividing the number of the gradebook by 4:<br>
My number of gradebook — 1131<br>
1131 % 4 = 3

So, in first implementation I did — a list based on built-in arrays/lists, in second implementation — a doubly linked list.

## How to Run
Make sure you have Node.js installed on your computer. If you don't have it, you can download it from the official website https://nodejs.org.

To run application:
```bash
$ npm start
```

To run tests:
```bash
$ npm test
```

## Reference to the commit, where CI tests failed
[Failed Commit](https://github.com/danil2205/Lab2_MTRPZ/commit/7691e2c6ac85b80bb7fe2bb515b8b58a02a9d6c3)

## Unit Tests
Unit Tests help me to:
- catch bugs early
- support refactoring
- improve code quality

In general, unit tests are an important tool for ensuring the quality and reliability of the code base.
