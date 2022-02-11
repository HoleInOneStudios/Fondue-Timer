const start = () => {
    //Get DOM Elements
    Timer.container = document.getElementById('timer_container');
    Type.container = document.getElementById('type_container');
    Fork.container = document.getElementById('fork_container');

    new Fork("1", "#ff0000");
    new Fork("2", "#0000ff");

    new Type("A");
    new Type("B");
}