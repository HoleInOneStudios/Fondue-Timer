const Edit = {
    editing: false,
}

function setup() {
    Fork.container = document.getElementById("forkContainer");
    Type.container = document.getElementById("typeContainer");
    Timer.container = document.getElementById("timerContainer");

    if (localStorage.getItem('forks') && localStorage.getItem('types')) {
        loadStorage();
    }
    else {
        new Fork("Black", 0xffffff, "⬛");
        new Fork("Red", 0xffffff, "🟥");
        new Fork("Green", 0xffffff, "🟩");
        new Fork("Purple", 0xffffff, "🟪");
        new Fork("Blue", 0xffffff, "🟦");
        new Fork("Yellow", 0xffffff, "🟨");

        new Type("Beef", "🥩", 0.5);
        new Type("Fish", "🐟", 0.5);
        new Type("Seafood", "🦐", 2.0);
        new Type("Lamb", "🐑", 1.0);
        new Type("Pork", "🐖", 1.0);
        new Type("Poultry", "🐔", 2.0);
        new Type("Veggies", "🥦", 3.0);
    }

    window.setInterval(tick, 1000);
}

function saveStorage() {
    let f = [];
    Fork.forks.forEach(element => {
        f.push(element.toObject());
    });
    localStorage.setItem('forks', JSON.stringify(f));

    let t = [];
    Type.types.forEach(element => {
        t.push(element.toObject());
    });
    localStorage.setItem('types', JSON.stringify(t));
}

function loadStorage() {
    JSON.parse(localStorage.getItem('forks')).forEach(element => {
        new Fork(element.name, element.color, element.icon);
    })
    JSON.parse(localStorage.getItem('types')).forEach(element => {
        new Type(element.name, element.icon, element.time);
    })
}

function clearStorage() {
    Fork.forks = [];
    Type.types = [];
    localStorage.clear();
    location.reload();
}

function tick() {
    Timer.timers.forEach(element => {
        element.tick();
    });
}

class Fork {
    static forks = [];
    static container;
    static selected;

    name;
    color;
    icon;
    elements;

    constructor (_name = "name", _color = 0xffffff, _icon = "") {
        this.name = _name;
        this.color = _color;
        this.icon = _icon;

        this.elements = createDisplay(this, true);
        Fork.container.append(this.elements.container);
        Fork.forks.push(this);

        this.clicked();
    }

    remove() {
        this.elements.container.remove();
        Fork.forks.splice(Fork.forks.indexOf(this), 1);
    }

    clicked() {
        if (Fork.selected) {
            Fork.selected.elements.container.classList.remove("selected");
        }
        Fork.selected = this;
        Fork.selected.elements.container.classList.add("selected");
        //console.log("selected: " + this.name);

        if (Edit.editing) {
            Edit.forkEdit(this);
        }
    }

    toObject() {
        return {
            name: this.name,
            color: this.color,
            icon: this.icon
        }
    }
}

class Type {
    static types = [];
    static container;
    static selected;

    name;
    color;
    icon;
    elements;

    constructor (_name = "name", _icon = "", _time = 0.0) {
        this.name = _name;
        this.time = _time;
        this.icon = _icon;

        this.elements = createDisplay(this, true);
        Type.container.append(this.elements.container);
        Type.types.push(this);
    }

    remove() {
        this.elements.container.remove();
        Type.types.splice(Type.types.indexOf(this), 1);
    }

    clicked() {
        if (Type.selected) {
            Type.selected.elements.container.classList.remove("selected");
        }
        Type.selected = this;
        //Type.selected.elements.container.classList.add("selected");
        //console.log("selected: " + this.name);

        if (!Edit.editing) {
            new Timer(Fork.selected, Type.selected);
        }
        else {
            Edit.typeEdit(this);
        }
    }

    toObject() {
        return {
            name: this.name,
            time: this.time,
            icon: this.icon
        }
    }
}
class Timer {
    static timers = [];
    static container;

    fork;
    type;
    secs;
    elements;

    constructor (_fork = "", _type = "") {
        this.fork = _fork;
        this.type = _type;
        this.secs = _type.time * 60;

        this.elements = this.createTimer();
        Timer.container.append(this.elements.container);

        Timer.timers.push(this);
    }

    clicked() {
        //console.log("deleted: " + this.fork.name + " " + this.type.name);
        this.elements.container.remove();
        Timer.timers.splice(Timer.timers.indexOf(this), 1);
    }

    tick() {
        this.secs--;
        this.elements.timer.innerHTML = this.toTimeString();
    }

    createTimer() {
        let e = document.createElement("div");
        e.classList.add("timer");

        e.tabIndex = 0;

        let e1 = createDisplay(this.fork, false);
        e1.container.classList.add('timerDisplay', 'selected');

        let e2 = createDisplay(this.type, false);
        e2.container.classList.add('timerDisplay', 'selected');

        let e3 = document.createElement("span");
        e3.className = "timerText";
        e3.innerHTML = this.toTimeString();

        e.append(e1.container);
        e.append(e2.container);
        e.append(e3);

        e.addEventListener("click", () => {
            this.clicked();
        });

        e.addEventListener("keydown", (e) => {
            if (e.keyCode == 13) {
                this.clicked();
            }
        });


        return {
            container: e,
            fork: e1,
            type: e2,
            timer: e3
        };
    }

    toTimeString() {
        let secs = this.secs % 60;
        let mins = Math.floor(this.secs / 60);

        return `${mins}:${secs}`;
    }

}

function createDisplay(_i, _option = false) {
    //Main Container of the display
    e = document.createElement("div");
    e.title = `display_${_i.name}`;
    e.className = "display";
    if (_i.color) {
        e.style.backgroundColor = "#" + _i.color.toString(16);
    }

    //Icon
    e2 = document.createElement("div");
    e2.title = `icon_display_${_i.name}`;
    e2.className = "displayIcon";
    e2.innerHTML = _i.icon;
    e.append(e2);

    //Name
    e3 = document.createElement("div");
    e3.title = `name_display_${_i.name}`;
    e3.className = "displayName";
    e3.innerHTML = _i.name;
    e.append(e3);

    if (_option) {
        //add clicked
        e.addEventListener("click", function (e) {
            _i.clicked();
        });

        //add enter key event listener
        e.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                _i.clicked();
            }
        });

        e.tabIndex = 0;
    }

    return {
        container: e,
        icon: e2,
        name: e3
    };
}

function toggleNav(e) {
    e.target.parentElement.classList.toggle('open');
}