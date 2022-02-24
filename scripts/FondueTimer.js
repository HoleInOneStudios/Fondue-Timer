let editing = false;
/** */
function start() {
  //Get DOM Elements
  Timer.container = document.getElementById("timer_container");
  Timer.audio = document.getElementById("audio_timeUp");

  Type.container = document.getElementById("type_container");
  Type.edit_name = document.getElementById("type_name");
  Type.edit_time = document.getElementById("type_time");
  Type.edit_type = document.getElementById("type_edit");

  Fork.container = document.getElementById("fork_container");
  Fork.edit_name = document.getElementById("fork_name");
  Fork.edit_color = document.getElementById("fork_color");
  Fork.edit_fork = document.getElementById("fork_edit");


  new Type("Beef: Medium Rare", "./rsc/002-cow.png", 0.5);
  new Type("Fish", "./rsc/004-fish.png", 0.5);
  new Type("Seafood", "./rsc/001-crab.png", 2.0);
  new Type("Lamb", "./rsc/007-ewe.png", 1.0);
  new Type("Pork", "./rsc/003-pig.png", 1.0);
  new Type("Poultry", "./rsc/005-chicken.png", 2.0);
  new Type("Vegetables", "./rsc/006-broccoli.png", 3.0);
  //new Type("Test", "./rsc/icons8-fondue-96.png", .1);

  new Fork("Black", '#000000');
  new Fork("Red", '#ff0000');
  new Fork("Green", '#00ff00');
  new Fork("Purple", '#ff00ff');
  new Fork("Blue", '#0000ff');
  new Fork("Cyan", '#00ffff');
  new Fork("Yellow", '#ffff00');
}
/** */
setInterval(() => {
  Timer.update();
}, 1000);
/** */
function toggleEdit() {
  editing = !editing;
}