class Type {
    /** @type {HTMLInputElement} */
    static edit_name;
    /** @type {HTMLInputElement} */
    static edit_time;
    /** @type {HTMLDivElement} */
    static edit_type;
    /** @type {Type} */
    static selection;
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
            Type.selection = _t;
            _t.addTimer();
        });
        return e;
    }
    /** */
    static Edit() {
        console.log("Toggle Edit")

        Type.edit_name.value = Type.selection.name;
        Type.edit_time.value = parseFloat(Type.selection.sec) / 60;

        Type.edit_type.classList.toggle('hidden');
    }
    /** */
    static cancelEdit() {
        console.log("Cancel Edit");
        Type.edit_type.classList.toggle('hidden');
    }
    /** */
    static confirmEdit() {
        console.log("Confirm Edit")

        Type.selection.name = Type.edit_name.value;
        Type.selection.sec = Type.edit_time.value * 60;
        Type.selection.update();

        Type.edit_type.classList.toggle('hidden');

        saveStorage();
    }

    //---------------------------------------//

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
    /** */
    update() {
        this.element.id = this.name;
        this.element.title = this.name;
        this.element.className = "option";
        this.element.alt = this.name;
        this.element.src = this.icon;
    }
    /** */
    addTimer() {
        
        if (!editing) {
            let _r = new Timer(Fork.selection, this);
        } else if (editing) {
            Type.Edit();
        }
    }
    /** */
    remove() {
        Type.types.splice(Type.types.indexOf(this), 1);
        this.element.classList += " fade_out";
        setInterval(() => {
            this.element.remove();
        }, 500);
    }
}