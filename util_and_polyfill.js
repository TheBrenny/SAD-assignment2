Array.prototype.hasCombination = function (a2) {
    return this.length === a2.length && this.every(val => a2.includes(val)) && a2.every(val => this.includes(val));
};
Object.isNull = function (...args) {
    return args.filter(e => e === undefined || e === null).length != 0;
};
String.prototype.replaceAll = function (find, replace) {
    if (find.constructor.name === "String") {
        find = new RegExp(find, "g");
    }
    if (find.constructor.name !== "RegExp") return this;
    if (!find.global) find = new RegExp(find, find.flags + "g");
    return this.replace(find, replace);
};
// Matchall polyfill - this is how we handle Node <12
String.prototype.matchAll = function (rx) {
    if (typeof rx === "string") rx = new RegExp(rx, "g");
    rx = new RegExp(rx);
    let cap = [];
    let all = [];
    while ((cap = rx.exec(this)) !== null) all.push(cap);
    return all;
};
RegExp.escape = function (s) {
    return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
};
Object.prototype.inherits = function (theSuper) {
    if (this.prototype === theSuper.prototype) return true;
    if (Object.getPrototypeOf(this) === null) return false;
    if (Object.getPrototypeOf(this) === theSuper) return true;
    return Object.getPrototypeOf(this).inherits(theSuper);
};
let ogSubstr = String.prototype.substr;
String.prototype.substr = function (start, length) {
    if (start < 0) start = (start % length) + length;
    if (length < 0) {
        length = Math.abs(length);
        start -= length;
    }
    return ogSubstr.call(this, start, length);
};
let ogSubstring = String.prototype.substring;
String.prototype.substring = function (start, end) {
    if (start < 0) start = (start % this.length) + this.length;
    if (end < 0) end = (end % this.length) + this.length;
    return ogSubstring.call(this, start, end);
};