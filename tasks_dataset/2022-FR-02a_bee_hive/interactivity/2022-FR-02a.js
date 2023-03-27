document.addEventListener("DOMContentLoaded", function (event) {
    var taskContainer = document.getElementById("task-container");
    var style = document.createElement('style');
    style.innerHTML = '' +
        document.head.appendChild(style);

    var taskWrapper = document.createElement("div");
    var taskGrid = document.createElement("div");
    var invisibleTaskGrid = document.createElement("div");
    taskWrapper.classList.add("bbrs-task-wrapper");
    taskGrid.classList.add("bbrs-task-grid");
    invisibleTaskGrid.classList.add("bbrs-task-grid");
    invisibleTaskGrid.classList.add("invisible");
    taskWrapper.appendChild(taskGrid);
    taskWrapper.appendChild(invisibleTaskGrid);
    taskContainer.appendChild(taskWrapper);

    // var taskImages = {bees: ["bee0.svg","bee1.svg","bee2.svg","bee3.svg","bee4.svg","bee5.svg","bee6.svg"],
    //     paths: ["path0.svg","path1.svg","path2.svg","path3.svg","path4.svg","path5.svg","path6.svg"],
    //     background: "background.svg"};

    var taskImages = {
        bees: ["/question_files/1/1/d/2022_fr_02a_bee0.svg", "/question_files/a/c/1/2022_fr_02a_bee1.svg", "/question_files/8/b/f/2022_fr_02a_bee2.svg", "/question_files/b/6/4/2022_fr_02a_bee3.svg", "/question_files/9/a/0/2022_fr_02a_bee4.svg", "/question_files/c/e/6/2022_fr_02a_bee5.svg", "/question_files/b/7/2/2022_fr_02a_bee6.svg"],
        paths: ["/question_files/7/2/f/2022_fr_02a_path0.svg", "/question_files/4/c/0/2022_fr_02a_path1.svg", "/question_files/0/2/2/2022_fr_02a_path2.svg", "/question_files/e/4/1/2022_fr_02a_path3.svg", "/question_files/a/8/3/2022_fr_02a_path4.svg", "/question_files/f/5/5/2022_fr_02a_path5.svg", "/question_files/4/e/0/2022_fr_02a_path6.svg"],
        background: "/question_files/3/f/9/2022_fr_02a_background.svg"
    };

    var correctPositions = [[0,6],[4],[0],[3],[0,5],[2,5,6],[1,2,6]];

    var hexagons = [];
    var bees = [];

    var answer = ["E", "E", "E", "E", "E", "E", "E"];

    for (var i = 0; i < 7; i++) {
        var block = document.createElement("div");
        block.classList.add("bbrs-task-block");
        block.classList.add("visible");
        block.style.backgroundImage = "url(" + taskImages.background + ")";
        block.value = i;
        taskGrid.appendChild(block);

        var invisibleBlock = document.createElement("div");
        invisibleBlock.classList.add("bbrs-task-block");
        invisibleBlock.classList.add("invisible");
        invisibleTaskGrid.appendChild(invisibleBlock);

        hexagons.push({block: block, invisibleBlock: invisibleBlock, bee: null, index: i});

        block.addEventListener("bbsDrop", function (e) {
            e.stopPropagation();
            var data = e.detail.getDraggable();
            if (data) {
                if (bees[data.value].slot !== hexagons[this.value].index && bees[data.value].slot !== null) {
                    hexagons[bees[data.value].slot].invisibleBlock.classList.remove("filled");
                    hexagons[bees[data.value].slot].bee = null;
                    bees[data.value].column.style.filter = "grayscale(0%)";
                }
                hexagons[this.value].invisibleBlock.appendChild(data);
                hexagons[this.value].invisibleBlock.classList.add("filled");
                hexagons[this.value].bee = bees[data.value].index;
                bees[data.value].slot = hexagons[this.value].index;
                bees[data.value].column.style.filter = "grayscale(100%)";
            }
            retrieveAnswer();
        });

    }

    var taskTable = document.createElement("table");
    taskTable.classList.add("bbrs-task-table");
    taskWrapper.appendChild(taskTable);
    var tr1 = document.createElement("tr");
    taskTable.appendChild(tr1);
    for (var i = 0; i < 7; i++) {
        var td = document.createElement("td");
        var beeContainer = document.createElement("div");
        beeContainer.classList.add("bbrs-bee-container");
        var bee = document.createElement("img");
        bee.classList.add("draggable");
        bee.value = i;
        var path = document.createElement("img");
        bee.src = taskImages.bees[i];
        path.src = taskImages.paths[i];
        beeContainer.appendChild(bee);
        beeContainer.style.backgroundImage = "url(" + taskImages.bees[i] + "), url(" + taskImages.background + ")";
        td.appendChild(beeContainer);
        td.appendChild(path);
        tr1.appendChild(td);
        bees.push({bee: bee, slot: null, index: i, parent: beeContainer, column: td});
        bee.addEventListener("bbsDragStart", function (e) {
            e.detail.setDraggable(this);
        });
    }



    function retrieveAnswer() {
        hexagons.forEach((element, index) => {
            if (element.bee !== null) {
                answer[element.index] = element.bee;
                // element.block.style.backgroundColor = (correctPositions[element.bee].includes(element.index))? "#5efca4" : "#fc5e6d";
                if(correctPositions[element.bee].includes(element.index)) {
                    element.block.style.backgroundColor = "#5efca4";
                } else {
                    element.block.style.backgroundImage = "none";
                    element.block.style.backgroundColor = "#fc5e6d";
                }
            } else {
                answer[element.index] = "E";
                element.block.style.backgroundColor ="#fcba5e";
                element.block.style.backgroundImage = "url(" + taskImages.background + ")";
            }
        });
    }

    taskWrapper.addEventListener("bbsDrop", function (e) {
        var data = e.detail.getDraggable();
        if (data) {
            if (answer.includes(data.value)) {
                bees[data.value].parent.appendChild(data);
                hexagons[bees[data.value].slot].invisibleBlock.classList.remove("filled");
                hexagons[bees[data.value].slot].bee = null;
                bees[data.value].slot = null;
                bees[data.value].column.style.filter = "grayscale(0%)";
            }
            retrieveAnswer();
        }
    });


    function appendChild() {
        let bee = document.getElementsByName("draggable");
        for (var i = 0; i < hexagons.length; i++) {
            if (hexagons[i].bee !== null) {
                hexagons[i].invisibleBlock.appendChild(bees[hexagons[i].bee].bee);
                hexagons[i].invisibleBlock.classList.add("filled");
                bees[hexagons[i].bee].column.style.filter = "grayscale(100%)";
            }
        }
    }

    var answerEl = document.getElementById('answer');
    // answerEl = {value: ""};
    if (answerEl) {
        var iniAnswer = answerEl.value;
        if (iniAnswer != "") {
            iniAnswer = unescape(iniAnswer);
            for (var i = 0; i < iniAnswer.length; i++) {
                if (iniAnswer[i] !== "E") {
                    hexagons[i].bee = parseInt(iniAnswer[i]);
                    bees[iniAnswer[i]].slot = i;
                }
            }
        }

        appendChild();
        retrieveAnswer();
    }

    getAnswer = function () {
        var str = "";
        answer.forEach(bee => {
            str += bee;
        });
        return str;
    }


});


