const Index         = require("./index.js");

class List {
    constructor() {
        this.lines      = [];
        this.indices    = {};
    }
    add(lines) {
        console.log("lines: ", lines);
        if(!Array.isArray(lines)) lines = [lines];
        this.lines.push(...lines);
        lines.forEach(
            line => {
                Object.keys(line).forEach(
                    key => {
                        if(!(key in this.indices)) {
                            this.indices[key] = new Index(key);
                        }
                        this.indices[key].add(line[key], line);
                    }
                )
            }
        );
        console.log(this.lines);
    }
}	

module.exports = List;
