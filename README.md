# `if return` proposal

| Field | Value |
| --- | --- |
| Proposal | `if return <expression>;` |
| Authors | [@NookieGrey](https://github.com/NookieGrey) |
| Champion | Seeking champion(s) |
| Stage | 0 |
| Process | [TC39 process document](https://tc39.es/process-document/) |

## Status

This repository contains an early Stage 0 draft.
The main immediate goal is to find TC39 champion(s) to refine scope, syntax, and semantics for potential Stage 1 presentation.

## Motivation

In JavaScript code, a common early-return pattern repeats often:

```js
const value = compute();
if (value) return value;
```

The proposal introduces a compact statement form for this exact pattern.

## Proposal shape

Proposed syntax:

```js
if return expression;
```

Intended behavior:
1. Evaluate `expression` once.
2. If the result is truthy, return that result from the current function.
3. Otherwise continue execution.

Equivalent desugaring model:

```js
const _temp = expression;
if (_temp) return _temp;
```

`_temp` above is explanatory only; no user-visible binding is created.

## Examples

### Basic use

```js
function getCachedOrNull(key) {
  if return cache.get(key);
  return null;
}
```

### Chained fallbacks

```js
function getGoodsPrice(id) {
  if return getPrice(id);
  if return getLastPrice(id);
  return 0;
}
```

### Single-evaluation guarantee

```js
function read() {
  if return maybeExpensiveRead();
  return "default";
}
```

`maybeExpensiveRead()` is evaluated once.

## Non-goals

- This proposal does not add an `else` branch to `if return`.
- This proposal does not change JavaScript truthiness rules.
- This proposal is not currently an expression-form construct.

## Open design questions

1. Is `if return` the best keyword order, or should alternative spellings be considered?
2. Should this form be allowed everywhere `return` is allowed, or in a narrower context?
3. Are there parsing or readability concerns with ASI and statement boundaries?
4. Should tooling enforce/forbid this shorthand in specific style profiles?

## Why built-in syntax?

Userland helpers cannot short-circuit with function-local `return`. This pattern can only be made concise with syntax.

## Champion request

Looking for TC39 champion(s) to help with:
1. Stage 1 viability assessment.
2. Syntax and grammar risk review.
3. Agenda strategy for initial TC39 discussion.
4. Consensus-building on alternatives.

See `/docs/champion-outreach.md` for a concise outreach message.

## Prototype and experiments

Not required for Stage 0, but useful for feedback quality:
1. A Babel prototype transform (optional).
2. ESLint/parser experiment support (optional).
3. Example corpus rewrite to measure readability impact.

### Babel proof-of-concept

This repository includes a minimal Babel prototype in `/transpiler/babel-plugin-if-return.js`.

Run it on the sample:

```bash
npm install
npm run transpile:example
```

Input:

- `/examples/input-if-return.js`

Output:

- `/examples/output-if-return.js`

Current PoC limitation: custom syntax is recognized only for standalone single-line statements in the form `if return <expression>;`.

## Specification draft

Early spec text lives in `/spec.emu` and is intentionally minimal at Stage 0.
