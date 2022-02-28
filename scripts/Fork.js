class Fork {
    /** @type {HTMLInputElement} */
    static edit_name;
    /** @type {HTMLInputElement} */
    static edit_color;
    /** @type {HTMLDivElement} */
    static edit_fork
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

        e.className = "option";
        e.style.backgroundColor = _f.color;
        e.style.color = getTextColor(_f.color);
        e.style.borderColor = "#000000"

        e.addEventListener("click", function () {
            _f.select();
        });

        e.innerText = _f.name;

        
        return e;
    }
    /** */
    static Edit() {
        console.log("Toggle Edit")

        Fork.edit_name.value = Fork.selection.name;
        Fork.edit_color.value = Fork.selection.color;

        Fork.edit_fork.classList.toggle('hidden');
    }
    /** */
    static cancelEdit() {
        console.log("Cancel Edit");
        Fork.edit_fork.classList.toggle('hidden');
    }
    /** */
    static confirmEdit() {
        console.log("Confirm Edit")

        Fork.selection.name = Fork.edit_name.value;
        Fork.selection.color = Fork.edit_color.value;
        Fork.selection.update();

        Fork.edit_fork.classList.toggle('hidden');

        saveStorage();
    }

    //---------------------------------------//

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
    /** */
    update() {
        this.element.title = "Select " + this.name;
        this.element.className = "option";
        this.element.style.backgroundColor = this.color;
        this.element.style.color = getTextColor(this.color);
        this.element.style.borderColor = "#000000";
        this.element.innerText = this.name;
    }
    /** */
    select() {
        Fork.selection = this;
        if (editing) {
            Fork.Edit();
        }
    }
    /** */
    remove() {
        Fork.forks.splice(Fork.forks.indexOf(this), 1)
        this.element.classList += " fade_out";
        setInterval(() => {
            this.element.remove();
        }, 500);
    }
}

function getTextColor(bgColor, lightColor="#ffffff", darkColor="#000000") {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
        if (col <= 0.03928) {
            return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? darkColor : lightColor;
}