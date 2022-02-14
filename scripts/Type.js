class Type {
    /** @type {Type[]} */
    static types = [];
    /** @type {HTMLDivElement} */
    static container;
    /** @param {Type} _t @returns {HTMLDivElement} */
    static createElement(_t) {
        let e = document.createElement("img");

        e.id = _t.name;
        e.title = _t.name;

        e.className = "option";
        e.style.backgroundColor = _t.color;

        e.alt = _t.name;
        e.src = _t.icon;
        e.addEventListener("click", function () {
            _t.addTimer();
        });

        return e;
    }

    /** @param {string} _name @param {string} _icon @param {number} _time  */
    constructor (_name = "no name", _icon = "./rsc/default.png", _time = 1) {
        /** @type {string} */
        this.name = _name;
        /** @type {string} */
        this.icon = _icon;
        /** @type {number} */
        this.sec = (_time.toFixed(2) * 60).toFixed(2);

        /** @type {HTMLDivElement} */
        this.element = Type.createElement(this);

        Type.container.appendChild(this.element);
        Type.types.push(this);
    }

    addTimer() {
        let _r = new Timer(Fork.selection, this);
    }

    remove() {
        Type.types.splice(Type.types.indexOf(this), 1);
        this.element.classList += " fade_out";
        setInterval(() => {
            this.element.remove();
        }, 500);
    }
}
