/*
 * The purpose of this file is to test all Database Unit Tests using Jest.
 * 
 * Author: Jarod Brennfleck
 * 02 Oct 20
 */
require("../util_and_polyfill");
const db = require("../db/db");

expect.extend({
    toHaveCombination(val, arr) {
        const pass = Array.isArray(val) && Array.isArray(arr) && Array.from(val).hasCombination(Array.from(arr));
        return {
            message: () => `expected ${arr} ${pass ? "not " : ""}to be a combination of ${val}`,
            pass: pass
        };
    }
});

// TODO: Create some tests when you get further in!