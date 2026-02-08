"use strict";

const SENTINEL_CALLEE = "__ifReturnSentinel__";
const SENTINEL_TAG = "__if_return_statement__";
const IF_RETURN_LINE_RE = /^(\s*)if\s+return\s+(.+?);\s*$/;

function rewriteIfReturnLines(code) {
  return code
    .split("\n")
    .map((line) => {
      const match = line.match(IF_RETURN_LINE_RE);
      if (!match) {
        return line;
      }

      const indent = match[1];
      const expression = match[2];
      return `${indent}${SENTINEL_CALLEE}(${expression}, "${SENTINEL_TAG}");`;
    })
    .join("\n");
}

module.exports = function ifReturnPlugin({ types: t }) {
  return {
    name: "proposal-if-return-poc",

    parserOverride(code, parserOpts, parse) {
      const rewritten = rewriteIfReturnLines(code);
      return parse(rewritten, parserOpts);
    },

    visitor: {
      ExpressionStatement(path) {
        const { node } = path;
        if (!t.isCallExpression(node.expression)) {
          return;
        }

        const call = node.expression;
        if (!t.isIdentifier(call.callee, { name: SENTINEL_CALLEE })) {
          return;
        }

        if (
          call.arguments.length !== 2 ||
          !t.isStringLiteral(call.arguments[1], { value: SENTINEL_TAG })
        ) {
          return;
        }

        if (!path.getFunctionParent()) {
          throw path.buildCodeFrameError(
            "`if return` is only valid inside a function body."
          );
        }

        const expression = call.arguments[0];
        const tempValue = path.scope.generateUidIdentifier("ifReturnValue");

        path.replaceWith(
          t.blockStatement([
            t.variableDeclaration("const", [
              t.variableDeclarator(tempValue, expression),
            ]),
            t.ifStatement(tempValue, t.returnStatement(t.cloneNode(tempValue))),
          ])
        );
      },
    },
  };
};
