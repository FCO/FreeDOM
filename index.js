const EventEmitter = require("events");
class Index extends EventEmitter {
    constructor(name) {
        this.name       = name;
        this.data       = {};
        this.willEmit   = {};
    }

    add(value, line) {
        if(!(value in this.data))
            this.data[value] = [];
        this.data[line].push(line);
        if(!(value in this.willEmit)) {
            this.willEmit[value] = setTimeout(
                () => {
                    this.emit(value);
                    delete this.willEmit[value];
                }
            );
        }
    }

    get values() {
        return Object.keys(this.data);
    }
}
