let editing = false;

function start() {
  //Get DOM Elements
  Timer.container = document.getElementById("timer_container");
  Timer.audio = document.getElementById("audio_timeUp");
  Type.container = document.getElementById("type_container");
  Fork.container = document.getElementById("fork_container");

  new Type("Beef: Medium Rare", "./rsc/002-cow.png", 0.5);
  new Type("Fish", "./rsc/004-fish.png", 0.5);
  new Type("Seafood", "./rsc/001-crab.png", 2.0);
  new Type("Lamb", "./rsc/007-ewe.png", 1.0);
  new Type("Pork", "./rsc/003-pig.png", 1.0);
  new Type("Poultry", "./rsc/005-chicken.png", 2.0);
  new Type("Vegetables", "./rsc/006-broccoli.png", 3.0);
  //new Type("Test", "./rsc/icons8-fondue-96.png", .1);

  new Fork("", '#000000');
  new Fork("", '#ff0000');
  new Fork("", '#00ff00');
  new Fork("", '#ff00ff');
  new Fork("", '#0000ff');
  new Fork("", '#00ffff');
  new Fork("", '#ffff00');
}

setInterval(() => {
  Timer.update();
}, 1000);
