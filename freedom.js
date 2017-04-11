const EventEmitter = require("events");

class FreeDOM extends EventEmitter {
    constructor(container) {
        super();
        this.container      = container;
        this.worker         = new Worker("./complete_worker.js");
        this.buffer         = [];
        this.timer;
        this.time_to_acc    = 10;

        this.worker.addEventListener("message", onmessage);
    }

    sendCmd(cmd, data) {
        this.worker.postMessage({cmd, data});
    }

    add(data) {
        this.buffer.push(data);
        if(this.timer == null) {
            this.timer = setTimeout(() => {
                console.log("sending");
                this.sendCmd("add", this.buffer);
                this.buffer = [];
                this.timer  = null;
            }, this.time_to_acc);
        }
    }

    onmessage(ev) {
        this.emit(ev.data.cmd, ev.data.data);
        console.log(`main thread received: ${JSON.stringify(ev.data)}`);
    }
}

module.exports = FreeDOM
