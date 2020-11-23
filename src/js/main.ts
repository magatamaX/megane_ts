import { func2 } from './common';

console.log('hello!');

const calc = (x: number, y: number) => x + y;

console.log(calc(2, 5));
console.log(calc(4, 2));

const func = (x: string) => `${x}!!`;

console.log(func2('aaaaa'))