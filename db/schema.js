/*
 * The purpose of this file is to create object bindings for each type of record in
 * the Database.
 * 
 * There was an initial idea to make this strict, as in things that are identified
 * as NOT NULL in the DB Schema, would be not null while being constructed.
 * However, an issue with this is building queries from these objects. Just take a
 * quick think about it... That's why the Object.isNull line is commented out.
 * 
 * The buildFromRow method takes a row, and the columns to use.
 * 
 * Author: Jarod Brennfleck
 * 11 Oct 20
 */

class Schema {
    constructor(...args) {
        args = Array.from(args);
        // if (Object.isOneNull(args.filter(a => a[2]).map(a => a[0]))) throw new BadSchemaErrorNullValue(...args);
        if (args.length > 0 && !args.every(confirmArgTypes)) throw new BadSchemaErrorBadTypes(...args);

        function confirmArgTypes(v) {
            if (v === undefined) return true; // undefined is okay
            if (v === null) return true; // null is okay
            if (Array.isArray(v[1])) {
                if (v[0] === undefined) return true;
                if (v[0] === null) return true;
                return Array.from(v[1]).includes(v[0].constructor.name);
            }
            if (v[0] === undefined) return true; // undefined is okay
            if (v[0] === null) return true; // null is okay
            return v[0].constructor.name === v[1];
        }
    }

    insertInto() {
        let table = this.constructor.name;
        let objs = Object.entries(this).filter(e => [e[1]].containsNull()); //!Object.isOneNull(e[1]));
        let cols = objs.map(e => e[0]).join(",");
        let vals = objs.map(e => e[1]).map(e => typeof e === "number" ? e : `"${e}"`).join(",");
        let ret = `INSERT INTO ${table} (${cols}) VALUES (${vals});`;
        // TODO: Wrap strings in quotes, and convert Dates to SQL Date Objects
        return ret;
    }
    insertValues() {
        let objs = Object.entries(this).filter(e => [e[1]].containsNull()); //!Object.isOneNull(e[1]));
        let vals = objs.map(e => e[1]).join(",");
        return `(${vals})`;
    }
}

class Attendance extends Schema {
    constructor(attendID, attendName) {
        super([attendID, "Number", true], [attendName, "String", true]);
        this.attendID = attendID;
        this.attendName = attendName.substring(0, 20);
    }
    static buildFromRow(row) {
        if (Array.isArray(row)) return row.map(r => this.buildFromRow(r));
        return new Attendance(row.attendID, row.attendName);
    }
}
class AttendanceRecord extends Schema {
    constructor(student, recordDate, attendance) {
        super([student, ["Student", "Number"], true], [recordDate, "String", true], [attendance, ["Attendance", "Number"], true]);
        this.studentID = student.constructor.name === "Student" ? student.studentID : student;
        this.recordDate = recordDate;
        this.attendID = attendance.constructor.name === "Attendance" ? attendance.attendID : attendance;
    }
    static buildFromRow(row) {
        if (Array.isArray(row)) return row.map(r => this.buildFromRow(r));
        return new AttendanceRecord(row.studentID, row.recordDate, row.attendID);
    }
}
class Student extends Schema {
    constructor(studentID, firstName, lastName, dob, group) {
        super([studentID, "Number", true], [firstName, "String", true], [lastName, "String", true], [dob, ["String", "Date"], true], [group, ["Number", "ClassGroup"], true]);
        this.studentID = studentID;
        this.firstName = firstName.substring(0, 20);
        this.lastName = lastName.substring(0, 60);
        this.dob = dob.constructor.name === "Date" ? dob.toLocaleString() : dob;
        this.groupID = group.constructor.name === "Group" ? group.groupID : group;
    }
    static buildFromRow(row) {
        if (Array.isArray(row)) return row.map(r => this.buildFromRow(r));
        return new Student(row.studentID, row.firstName, row.lastName, row.dob, row.groupID);
    }
}
class ClassGroup extends Schema {
    constructor(groupID, groupName) {
        super([groupID, "Number", true], [groupName, "String", true]);
        this.groupID = groupID;
        this.groupName = groupName.substring(0, 20);
    }
    static buildFromRow(row) {
        if (Array.isArray(row)) return row.map(r => this.buildFromRow(r));
        return new ClassGroup(row.groupID, row.groupName);
    }
}
class Activity extends Schema {
    constructor(activityID, parent, activityName) {
        super([activityID, "Number", true], [parent, ["Number", "Activity"], false], [activityName, "String", true]);
        this.activityID = activityID;
        this.parentID = parent.constructor.name === "Activity" ? parent.activityID : parent;
        this.activityName = activityName.substring(0, 50);
    }
    static buildFromRow(row) {
        if (Array.isArray(row)) return row.map(r => this.buildFromRow(r));
        return new Activity(row.activityID, row.parentID, row.activityName);
    }
    static constructTree(activities, depth) {
        //#region a really big comment
        /*
         * Right now my thought process:
         *
         * So I thought of just doing a single pass but considering the data
         * we're getting that's not possible... Also what if by chance all the
         * parts are at the end of the list.
         * 
         * So now I'm thinking that we have to run three times over, creating
         * a new depth level each time:
         *    1st pass - Look for parentID === null
         *    2nd pass - Look for parentID exists and use it
         *    3rd pass - Deep Look for parentID using ".children"
         *    4th pass - Do 3rd pass again, but them as the "parentID"
         * We can do these while removing the elemants we've operated on
         * 
         * There's likely to be a much better way to do this, but I can't think
         * of it rn, and I don't want to waste time.
         * 
         * A more efficient way to do this could be to represent it as a tree
         * root -- start at the bottom (the lowest children) and build upward.
         * The only issue is that it would pretty much require object
         * duplication when accessing parents - think about it...
         */
        //#endregion

        depth = parseInt(depth) || 4; //1=badges only, 2=tests, 3=topics, 4=parts (all)
        let output = [];
        let copy = [];
        if (!Array.isArray(activities)) activities = [activities];
        activities = Array.from(activities); // enforce array! (also gives me typings!)
        let newActivity = (a) => Object.assign({
            children: []
        }, a);

        // FIRST PASS
        if (depth >= 1) {
            copy = Array.from(activities);
            for (let i = 0; i < copy.length; i++) {
                let a = copy[i];

                if (a.parentID === null) {
                    output.push(newActivity(a));
                    activities.splice(i, 1);
                }
            }
        }

        // SECOND PASS
        if (depth >= 2) {
            copy = Array.from(activities);
            for (let i = 0; i < copy.length; i++) {
                let a = copy[i];
                let badgeIDX = output.length - 1;

                for (; badgeIDX >= 0; badgeIDX--) { // go backwards so we can reach -1 without extra logic
                    if (output[badgeIDX].activityID === a.parentID) break; // exit the loop, halting pIdx--
                }

                if (badgeIDX >= 0) {
                    output[badgeIDX].children.push(newActivity(a));
                    activities.splice(i, 1); // remove this bc it's been opped on.
                }
            }
        }

        // THIRD PASS
        if (depth >= 3) {
            copy = Array.from(activities);
            for (let i = 0; i < copy.length; i++) {
                let a = copy[i];
                let badgeIDX = output.length - 1;
                let testIDX = -1;

                for (; badgeIDX >= 0; badgeIDX--) { // go backwards so we can reach -1 without extra logic
                    testIDX = output[badgeIDX].children.length - 1;

                    for (; testIDX >= 0; testIDX--) {
                        if (output[badgeIDX].children[testIDX].activityID === a.parentID) break; // exit the loop, halting pIdx--
                    }

                    if (testIDX >= 0) break; // break because if we aren't -1, then we broke the above loop.
                }

                if (badgeIDX >= 0 && testIDX >= 0) {
                    output[badgeIDX].children[testIDX].children.push(newActivity(a));
                    activities.splice(i, 1); // remove this bc it's been opped on.
                }
            }
        }

        // FOURTH PASS
        if (depth >= 4) {
            copy = Array.from(activities);
            for (let i = 0; i < copy.length; i++) {
                let a = copy[i];
                let badgeIDX = output.length - 1;
                let testIDX = -1;
                let topicIDX = -1;

                for (; badgeIDX >= 0; badgeIDX--) { // go backwards so we can reach -1 without extra logic
                    testIDX = output[badgeIDX].children.length - 1;

                    for (; testIDX >= 0; testIDX--) {
                        topicIDX = output[badgeIDX].children[testIDX].children.length - 1;

                        for (; topicIDX >= 0; topicIDX--) {
                            if (output[badgeIDX].children[testIDX].children[topicIDX].activityID === a.parentID) break; // exit the loop, halting pIdx--
                        }

                        if (topicIDX >= 0) break; // break because if we aren't -1, then we broke the above loop.
                    }
                    if (testIDX >= 0) break;
                }

                if (badgeIDX >= 0 && testIDX >= 0 && topicIDX >= 0) {
                    output[badgeIDX].children[testIDX].children[topicIDX].children.push(newActivity(a));
                    activities.splice(i, 1); // remove this bc it's been opped on.
                }
            }
        }

        return output;
    }
}
class ActivityCompleted extends Schema {
    constructor(student, activity, completionDate) {
        super([student, ["Number", "Student"], true], [activity, ["Number", "Activity"], true], [completionDate, ["String", "Date"], true]);
        this.studentID = student.constructor.name === "Student" ? student.studentID : student;
        this.activityID = activity.constructor.name === "Activity" ? activity.activityID : activity;
        this.completionDate = completionDate.constructor.name === "Date" ? completionDate.toLocaleString() : completionDate;
    }
    static buildFromRow(row) {
        if (Array.isArray(row)) return row.map(r => this.buildFromRow(r));
        return new ActivityCompleted(row.studentID, row.activityID, row.completionDate);
    }
}

class BadSchemaError extends Error {
    constructor(msg, args) {
        super();
        this.message = msg + ': [' + args.join(', ') + ']';
    }
}
class BadSchemaErrorNullValue extends BadSchemaError {
    constructor(...args) {
        super("One of the following args is null when it can't be", Array.from(args));
    }
}
class BadSchemaErrorBadTypes extends BadSchemaError {
    constructor(types, ...args) {
        super("There is a mismatch in type expectations", Array.from(args).map((el, i) => [typeof el, types[i]]));
    }
}

module.exports = {
    Schema,
    Attendance,
    AttendanceRecord,
    Student,
    ClassGroup,
    Activity,
    ActivityCompleted,
    errors: {
        BadSchemaError,
        BadSchemaErrorNullValue,
        BadSchemaErrorBadTypes
    }
};
module.exports.insertMany = function (...vals) {
    if (vals.length === 0) return "";
    if (Array.isArray(vals[0])) vals = vals[0];
    if (vals.some(v => !v.doesExtend(Schema))) return "";
    if (vals.map(v => v.constructor.name).some(v => v !== vals[0].constructor.name)) return "";
    let table = vals[0].constructor.name;
    let objs = Object.entries(vals[0]).filter(e => [e[1]].containsNull()); //!Object.isOneNull(e[1]));
    let cols = objs.map(e => e[0]).join(",");
    let theVals = vals.map(v => v.insertValues());
    let ret = `INSERT INTO ${table} (${cols}) VALUES ${theVals.join(",")};`;
    // TODO: Wrap strings in quotes, and convert Dates to SQL Date Objects
    return ret;
};
module.exports.formatDateToSQL = function (date) {
    if (!date.doesExtend(Date)) return date;
    let ret = [date.getFullYear(), (new Date().getMonth())];
    return;

    // TODO: SET THE DATE TO YYYY-MM-DD format!
};