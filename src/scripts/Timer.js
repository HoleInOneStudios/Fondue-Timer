class Timer {
    /** @type {Timer[]} */
    static timers = [];
    /** @type {HTMLDivElement} */
    static container;
    /** @type {HTMLAudioElement} */
    static audio;
    /** @param {Timer} _t  @returns {string} hh:mm:ss */
    static getFormattedTime(_t) {
        let s = parseInt(_t.sec_left % 60).toString().padStart(2, '0');
        let m = parseInt(_t.sec_left / 60).toString().padStart(2, '0');
        let h = parseInt(_t.sec_left / (60 * 60)).toString().padStart(2, '0');

        return h + ":" + m + ":" + s;
    }
    /** */
    static update() {
        Timer.timers.forEach(element => {
            if (element.sec_left > 0){
                element.sec_left -= 1;

                element.text.innerText = Timer.getFormattedTime(element);
            }
            else {
                element.text.style.color = "red";
                Timer.audio.play();
            }
        });
    }
    /**@param {Timer} _t @returns {HTMLDivElement} */
    static createElement(_t) {
        let e = document.createElement('div');
        e.className = "timer";
        e.title = `Timer for ${_t.fork.name}'s ${_t.type.name}`;
        e.addEventListener('click', function () { _t.dismiss() });
        Timer.container.appendChild(e);

        
        e.appendChild(Fork.createElement(_t.fork));

        e.appendChild(Type.createElement(_t.type));

        _t.text = document.createElement('p');
        _t.text.title = "Timer"
        _t.text.innerText = Timer.getFormattedTime(_t);
        e.appendChild(_t.text);
        
        return e;
    }

    //---------------------------------------//

    /** @param {Fork} _fork @param {Type} _type */
    constructor (_fork, _type) {
        /** @type {Fork} */
        this.fork = _fork;
        /** @type {Type} */
        this.type = _type;
        /** @type {Number} */
        this.sec_left = _type.sec;
        /** @type {HTMLParagraphElement} */
        this.text;

        /** @type {HTMLDivElement} */
        this.element = Timer.createElement(this);

        Timer.timers.push(this);
    }
    /** */
    dismiss() {
        Timer.timers.splice(Timer.timers.indexOf(this), 1);
        this.element.className += " fadeOut";
        setTimeout(() => {
            this.element.remove();
        }, 500);
        
    }
}