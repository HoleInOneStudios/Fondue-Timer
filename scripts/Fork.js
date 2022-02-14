class Fork {
    /** @type {Fork[]} */
    static forks = [];
    /** @type {HTMLElement} */
    static container;
    /** @type {Fork} */
    static selection;
    /** @param {Fork} _f @returns {HTMLDivElement} */
    static createElement(_f) {
        let e = document.createElement('div');

        e.title = "Select " + _f.name;

        e.innerText = _f.name;

        e.className = "option";
        e.style.backgroundColor = _f.color;

        e.addEventListener('click', function () { _f.select() });
        
        return e;
    }

    /** @param {string} _name @param {string} _color  */
    constructor (_name = "no name", _color = "#ffffff") {
        /** @type {string} */
        this.name = _name;
        /** @type {string} */
        this.color = _color;

        /** @type {HTMLDivElement} */
        this.element = Fork.createElement(this);

        Fork.container.appendChild(this.element);
        Fork.forks.push(this);
    }

    select() {
        Fork.selection = this;
    }

    remove() {
        Fork.forks.splice(Fork.forks.indexOf(this), 1)
        this.element.classList += " fade_out";
        setInterval(() => {
            this.element.remove();
        }, 500);
    }
}