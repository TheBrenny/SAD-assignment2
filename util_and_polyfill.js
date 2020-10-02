Array.prototype.hasCombination = function (a2) {
    return this.length === a2.length && this.every(val => a2.includes(val)) && a2.every(val => this.includes(val));
};