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