# proposal-if-return


| ECMAScript proposal  |         `if return %exp%`         |
|----------------------|-----------------------------------|
| **Author**           | @NookieGrey                       |
| **Stage**            | [0](https://tc39.es/process-document/) |

## Use cases and motivation

if we need to first check if the data present, and if it is, return it

we need to get this data either twice
```js
if (calculate()) {
    return calculate();
}
```

or store them in a variable

```js
const result = calculate();
if (result) {
    return result;
}
```
but what if we can reduce that code to a single statement?

```js
if return calculatie();
```

example of a typical utility

```js
function getGoodsPrice(id) {
      const price = getPrice(id);
      if (price) {
            return price;
      }

      const lastPrice = getLastPrice(id);
      if (lastPrice) {
            return lastPrice;
      }

      return 0;
}
```

can be simplified to

```js
function getGoodsPrice(id) {
      if return getPrice(id);
      if return getLastPrice(id);
      
      return 0;
}
```

## else statement

we don't need else

```js
if return calculation1() else if return calculation2()
```

because its eqvivalent to

```js
if return calculation1();
if return calculation2();
```

since any code after `if return` will be in the else block anyway

## transpiler implementations

WIP