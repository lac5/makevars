# makevars
It's like a makefile for variables

#### How to use
`vars.js`
```js
import make from 'makevars';

export const vars = make(function(key) {
    switch(key) {
        case 'a': 
            console.log('a');
            return 1;
        case 'b':
            console.log('b');
            return 2;
    }
})
```

`main.js`
```js
import { vars } from './vars.js';

console.log(vars.a);
// console: a
// console: 1
consolo.log(vars.b);
// console: b
// console: 2
console.log(vars.a + vars.b);
// console: 3
// a and b are stored so the make function isn't called again.
```
