const EventEmitter  = require("events");
const List          = require("./list.js");

const emitter       = new EventEmitter();
const list          = new List();

onmessage = ev => emitter.emit(ev.data.cmd, ev.data.data);

emitter.on(
    "add", data => {
        console.log(`adding data: ${JSON.stringify(data)}`)
        list.add(data);
        //console.log(`lines: ${JSON.stringify(lines)}`)
    }
);
