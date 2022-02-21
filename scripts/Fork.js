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