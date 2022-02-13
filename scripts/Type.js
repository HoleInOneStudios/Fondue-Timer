/// <reference path="./FondueTimer.ts" />

class Type {
    /** @type {Type[]} */
    static types = [];
    /** @type {HTMLElement} */
    static container;
    /**
     * @param {Timer} _t 
     * @returns {Element}
     */
    static createElement(_t) {
        let e = document.createElement('img');
        e.id = _t.name;
        e.title = _t.name;
        e.alt = _t.name;
        e.src = _t.icon;
        e.innerText = _t.name;
        e.className = "option";
        e.style.backgroundColor = _t.color;
        e.addEventListener('click', function () { _t.addTimer() });

        return e;
    }

    /**
     * @param {string} _name 
     * @param {string} _color 
     * @param {string} _icon 
     * @param {number} _time 
     */
    constructor (_name = "no name", _color = "#ffffff", _icon = "./rsc/default.png", _time = 0) {
        this.name = _name;
        this.color = _color;
        this.icon = _icon;
        this.sec = (_time.toFixed(2) * 60).toFixed(2);

        this.element = Type.createElement(this);

        Type.container.appendChild(this.element);
        Type.types.push(this);
    }

    addTimer() {
        let _r = new Timer(Fork.selection, this);
    }
}