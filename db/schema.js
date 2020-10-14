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
        // if (Object.isNull(args.filter(a => a[2]).map(a => a[0]))) throw new BadSchemaErrorNullValue(...args);
        if (args.length > 0 && !args.every(confirmArgTypes)) throw new BadSchemaErrorBadTypes(...args);

        function confirmArgTypes(v) {
            if (v === undefined) return true; // undefined is okay
            if (v === null) return true; // null is okay
            if (Array.isArray(v[1])) {
                return Array.from(v[1]).includes(v[0].constructor.name);
            }
            return v[0].constructor.name === v[1];
        }
    }

    insertInto() {
        let table = this.constructor.name;
        let objs = Object.entries(this).filter(e => !Object.isNull(e[1]));
        let cols = objs.map(e => e[0]).join(",");
        let vals = objs.map(e => e[1]).map(e => typeof e === "number" ? e : `"${e}"`).join(",");
        let ret = `INSERT INTO ${table} (${cols}) VALUES (${vals});`;
        // TODO: Wrap strings in quotes, and convert Dates to SQL Date Objects
        return ret;
    }
    insertValues() {
            let objs = Object.entries(this).filter(e => !Object.isNull(e[1]));
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
    static buildFromRow(row, complex) {
        if (complex) console.log("Complex mode isn't built yet");
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
}
class ClassGroup extends Schema {
    constructor(groupID, groupName) {
        super([groupID, "Number", true], [groupName, "String", true]);
        this.groupID = groupID;
        this.groupName = groupName.substring(0, 20);
    }
}
class Activity extends Schema {
    constructor(activityID, parent, activityName) {
        super([activityID, "Number", true], [parent, ["Number", "Activity"], false], [activityName, "String", true]);
        this.activityID = activityID;
        this.parentID = parent.constructor.name === "Activity" ? parent.activityID : parent;
        this.activityName = activityName.substring(0, 50);
    }
}
class ActivityCompleted extends Schema {
    constructor(student, exam, completionDate) {
        super([student, ["Number", "Student"], true], [exam, ["Number", "Exam"], true], [completionDate, ["String", "Date"], true]);
        this.studentID = student.constructor.name === "Student" ? student.studentID : student;
        this.examID = exam.constructor.name === "Exam" ? exam.examID : exam;
        this.completionDate = completionDate.constructor.name === "Date" ? completionDate.toLocaleString() : completionDate;
    }
}

class BadSchemaError extends Error {
    constructor(msg, args) {
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
    if (vals.some(v => !v.inherits(Schema.prototype))) return "";
    if (vals.map(v => v.constructor.name).some(v => v !== vals[0].constructor.name)) return "";
    let table = vals[0].constructor.name;
    let objs = Object.entries(vals[0]).filter(e => !Object.isNull(e[1]));
    let cols = objs.map(e => e[0]).join(",");
    let theVals = vals.map(v => v.insertValues());
    let ret = `INSERT INTO ${table} (${cols}) VALUES ${theVals.join(",")};`;
    // TODO: Wrap strings in quotes, and convert Dates to SQL Date Objects
    return ret;
};
module.exports.formatDateToSQL = function (date) {
    if (!date.inherits(Date.prototype)) return date;
    let ret = [date.getFullYear(), (new Date().getMonth())];
    return;

    // TODO: SET THE DATE TO YYYY-MM-DD format!
};