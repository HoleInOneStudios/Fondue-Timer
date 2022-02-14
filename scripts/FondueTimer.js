function start() {
    //Get DOM Elements
    Timer.container = document.getElementById('timer_container');
    Type.container = document.getElementById('type_container');
    Fork.container = document.getElementById('fork_container');

    new Type("Beef: Medium Rare", "./rsc/default.png", .50);
    new Type("Fish", "./rsc/default.png", 0.50);
    new Type("Seafood", "./rsc/default.png", 2.00);
    new Type("Lamb", "./rsc/default.png", 1.00);
    new Type("Pork", "./rsc/default.png", 1.00);
    new Type("Poultry", "./rsc/default.png", 2.00);
    new Type("Vegetables", "./rsc/default.png", 3.00);

    new Fork("Guest")
}

setInterval(() => {
    Timer.update();
}, 1000);