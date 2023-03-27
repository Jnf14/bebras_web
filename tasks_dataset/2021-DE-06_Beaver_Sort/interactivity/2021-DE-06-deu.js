document.addEventListener("DOMContentLoaded", function (event) {
    var taskContainer = document.getElementById("task-container");
    var style = document.createElement('style');
    var params = {height: 215, width: 600, speed: 600};
    var frames = [
                
			"/question_files/e/4/6/2021_de_06_taskbody_step00.svg", "/question_files/4/1/6/2021_de_06_taskbody_step01.svg","/question_files/1/1/8/2021_de_06_taskbody_step02.svg","/question_files/f/9/b/2021_de_06_taskbody_step03.svg","/question_files/a/1/f/2021_de_06_taskbody_step04.svg","/question_files/a/6/1/2021_de_06_taskbody_step05.svg","/question_files/a/0/4/2021_de_06_taskbody_step06.svg", "/question_files/0/2/5/2021_de_06_taskbody_step07.svg", "/question_files/d/8/0/2021_de_06_taskbody_step08.svg", "/question_files/a/5/d/2021_de_06_taskbody_step09.svg"
    ];
    style.innerHTML = '#wrapper {width: ' + params.width + 'px; height: auto; position: relative;} #container-animation {width: ' + params.width + 'px; height: ' + params.height + 'px; text-align: center;} .frames {width: ' + params.width + 'px; height: auto;} ' +
        '.bttn-animate {border: none; padding: 5px 25px; border-radius: 15%; background: #75b497; color: #fff; font-size: 25px; border-bottom: 5px solid #588872; position: relative; cursor: pointer;} ' +
        '.bttn-animate:active {border: none;top: 10px;} .bttn-animate:disabled {background: #bebebe; border: none;top: 10px;}' +
        '#button-controls{background-color: #666666; width: 183px; text-align: center; border-radius: 10px; position: absolute; bottom: 0;} ' +
        '.btn {margin: 9px !important; height: 15px;} .btn:hover {background-color: #666666;}';
    document.head.appendChild(style);

    var wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    var containerAnimation = document.createElement('div');
    containerAnimation.id = 'container-animation';
    var frame = document.createElement('img');
    frame.id = 'animation-frame';
    frame.className = 'frames';
    frame.src = frames[0];
    var controls = document.createElement("div");
    controls.id = "button-controls"
    containerAnimation.appendChild(frame);
    wrapper.appendChild(containerAnimation);
    taskContainer.appendChild(wrapper);
    wrapper.appendChild(controls);

    var buttons = [
        {action: "previous", icon: "/question_files/4/4/3/previous.svg"}, 
        {action: "play", icon: "/question_files/9/6/e/play.svg"},
        {action: "pause", icon: "/question_files/b/d/4/pause3.svg"},
        {action: "next", icon: "/question_files/1/c/d/next.svg"},
    ];

    for (var i = 0; i < buttons.length; i++) {
        var btn = document.createElement("input");
        btn.classList.add("btn");
        btn.id = "btn-" + buttons[i].action;
        btn.type = "image";
        btn.src = buttons[i].icon;
        btn.value = buttons[i].action;
        btn.addEventListener('click', function () {
            switch (this.value) {
                case "play":
                    play(this);
                    break;
                case "pause":
                    pause(this);
                    break;
                case "next":
                    next(this);
                    break;
                case "previous":
                    previous(this);
                    break;
            }
        });
        controls.appendChild(btn);
    }


    var paused = true;
    var pos = 0;

    function play(element) {
        if(!paused) {
            return;
        }

        paused = false;

        function animate() {
            if (paused) {
                return;
            }

            _next(element);

            if (pos === frames.length - 1) {
                paused = true;
                return;
            }

            if (!paused) {
                setTimeout(animate, params.speed);
            }

        }

        animate();
    }

    function pause() {
        paused = true;
    }

    function previous() {
        paused = true;
        if (pos === 0) {
            pos = frames.length - 1;
        } else {
            pos--;
        }
        document.getElementById('animation-frame').src = frames[pos];
    }

    function next() {
        paused = true;
        _next();
    }

    function _next(element) {
        if (pos === frames.length - 1) {
            pos = 0;
        } else {
            pos++;
        }
        document.getElementById('animation-frame').src = frames[pos];
    }

});