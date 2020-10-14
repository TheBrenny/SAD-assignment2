require("../util_and_polyfill");
const test = require("ava");

test("Array.prototype.hasCombination", t => {
    t.true([1, 2, 3, 4].hasCombination([4, 3, 1, 2]));
    t.false([1, 2, 3, 4].hasCombination([4, 4, 4, 4]));
    t.false([1, 2, 3, 4].hasCombination([1, 2, 3]));
    t.true([].hasCombination([]));
});

test("Object.isOneNull", t => {
    t.true(Object.isOneNull(null));
    t.true(Object.isOneNull(null, null, undefined));
    t.false(Object.isOneNull(0, 0, 0, 0));
    t.true(Object.isOneNull(0, null, undefined));
});

test("String.prototype.replaceAll and inherently RegExp.escape", t => {
    t.is("abcdefg".replaceAll(/[aceg]/i, "!"), "!b!d!f!");
    t.is("\"this has quotes\"".replaceAll("\"", "'"), "'this has quotes'");
    t.is("hello ${name}".replaceAll("${name}", "WORLD"), "hello WORLD");
});

test("Object.prototype.inherits", t => {
    class A {}
    class B extends A {}
    class C extends A {}

    t.true((new B()).inherits(A));
    t.true((new C()).inherits(A));
    t.false((new C()).inherits(B));
    t.false((new B()).inherits(C));
    t.true((new C()).inherits(C));
    t.true((new A()).inherits(Object));
});

test("String.prototype.substr(ing)", t => {
    t.is("0123456789".substr(3, -3), "012");
    t.is("0123456789".substr(-3), "789");
    t.is("0123456789".substring(2, -2), "234567");
    t.is("0123456789".substring(-4), "6789");
});