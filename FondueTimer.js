const color = {
    AQUA: "#00FFFF",
    LIME: "#00FF00",
    SILVER: "#C0C0C0",
    BLACK: "#000000",
    MAROON: "#800000",
    TEAL: "#008080",
    BLUE: "#0000FF",
    NAVY: "#000080",
    WHITE: "#FFFFFF",
    FUCHSIA: "#FF00FF",
    OLIVE: "#808000",
    YELLOW: "#FFFF00",
    GRAY: "#808080",
    PURPLE: "#800080",
    GREEN: "#008000",
    RED: "#FF0000"
}

class Type {
    constructor (_name = "noname", _icon = "./rsc/default.png", _time = 0.00) {
        this.name = _name;
        this.icon = _icon;
        this.time = _time;
  }
}

class Fork {
    constructor (_name = "noname", _color = color.WHITE) {
        this.name = _name;
        this.color = _color;
  }
}

class Timer {
    constructor (_fork, _type) {
        this.fork = _fork;
        this.type = _type;
  }
}
