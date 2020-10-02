// Transpile https://github.com/TheBrenny/sql-connection

/*
 * The purpose of this file is to act as a String Builder specifically for
 * Queries. It only has knowledge of itself and therefore doesn't touch the DB
 * or the results at all.
 * 
 * Author: Jarod Brennfleck
 * 02 Oct 20
 */

class Query {
    constructor(statement) {
        statement = statement || "";
        this.statement = statement;
    }
}

module.exports = Query;