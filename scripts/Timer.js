class Timer {
    /** @type {Timer[]} */
    static timers = [];
    /** @type {HTMLElement} */
    static container;

    static createElement(_t) {
        let e = document.createElement('div');

        e.className = "timer";

        e.addEventListener('click', function () { _t.dismiss() });
        
        let f = document.createElement('div');

        f.id = _t.fork.name;
        f.title = _t.fork.name;

        f.innerText = _t.fork.name;

        f.className = "option";
        f.style.backgroundColor = _t.fork.color;

        e.appendChild(f);


        let y = document.createElement('img');

        y.id = _t.type.name;
        y.title = _t.type.name;
        y.alt = _t.type.name;

        y.src = _t.type.icon;

        y.innerText = _t.type.name;

        y.className = "option";
        y.style.backgroundColor = _t.type.color;

        e.appendChild(y);


        return e;
    }

    constructor (_fork, _type) {
        this.fork = _fork;
        this.type = _type;

        this.element = Timer.createElement(this);

        Timer.container.appendChild(this.element);
        Timer.timers.push(this);
    }

    dismiss() {
        Timer.timers.splice(Timer.timers.indexOf(this), 1);
        this.element.remove();
    }
}