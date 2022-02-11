class Type {
    /** @type {Type[]} */
    static types = [];
    /** @type {HTMLElement} */
    static container;

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

    constructor (_name = "no name", _color = "#ffffff", _icon = "./rsc/default.png") {
        this.name = _name;
        this.color = _color;
        this.icon = _icon;

        this.element = Type.createElement(this);

        Type.container.appendChild(this.element);
        Type.types.push(this);
    }

    addTimer() {
        let _r = new Timer(Fork.selection, this);
    }
}