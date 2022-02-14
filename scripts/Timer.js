class Timer {
    /** @type {Timer[]} */
    static timers = [];
    /** @type {HTMLElement} */
    static container;
    static update() {
        Timer.timers.forEach(element => {
            if (element.sec_left > 0){
                element.sec_left -= 1;
                element.text.innerText = parseInt(element.sec_left / 60) + ":" + element.sec_left % 60;
            }
        });
    }

    static createElement(_t) {
        let e = document.createElement('div');
        e.className = "timer";
        e.addEventListener('click', function () { _t.dismiss() });

        let f = document.createElement('div');
        f.id = _t.fork.name;
        f.innerText = _t.fork.name;
        f.className = "option";
        f.style.backgroundColor = _t.fork.color;
        e.appendChild(f);

        let y = document.createElement('img');
        y.id = _t.type.name;
        y.alt = _t.type.name;
        y.src = _t.type.icon;
        y.innerText = _t.type.name;
        y.className = "option";
        y.style.backgroundColor = _t.type.color;
        e.appendChild(y);

        _t.text = document.createElement('p');
        _t.text.id = _t.type.name;
        _t.text.innerText = _t.sec_left;
        _t.text.className = "timer_text";
        e.appendChild(_t.text);

        return e;
    }

    /**
     * 
     * @param {Fork} _fork 
     * @param {Type} _type 
     */
    constructor (_fork, _type) {
        this.fork = _fork;
        this.type = _type;
        this.sec_left = _type.sec;
        this.text = undefined;

        this.element = Timer.createElement(this);


        Timer.container.appendChild(this.element);
        Timer.timers.push(this);
    }

    dismiss() {
        Timer.timers.splice(Timer.timers.indexOf(this), 1);
        this.element.className += " timer_out";
        setTimeout(() => {
            this.element.remove();
        }, 500);
        
    }
}