function start() {
    //Get DOM Elements
    Timer.container = document.getElementById('timer_container');
    Type.container = document.getElementById('type_container');
    Fork.container = document.getElementById('fork_container');

    new Type("Beef: Medium Rare", "./rsc/002-cow.png", .50);
    new Type("Fish", "./rsc/004-fish.png", 0.50);
    new Type("Seafood", "./rsc/001-crab.png", 2.00);
    new Type("Lamb", "./rsc/007-ewe.png", 1.00);
    new Type("Pork", "./rsc/003-pig.png", 1.00);
    new Type("Poultry", "./rsc/005-chicken.png", 2.00);
    new Type("Vegetables", "./rsc/006-broccoli.png", 3.00);

    new Fork("Guest")
}

setInterval(() => {
    Timer.update();
}, 1000);