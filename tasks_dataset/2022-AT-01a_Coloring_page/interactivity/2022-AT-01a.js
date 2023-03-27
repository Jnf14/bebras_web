document.addEventListener("DOMContentLoaded", function (event) {
    var style = document.createElement('style');
    style.innerHTML = "";
    var taskContainer = document.getElementById("task-container");
    taskContainer.appendChild(style);
    var taskWrapper = document.createElement("div");
    taskWrapper.id = "task-wrapper";

    var taskSVG = document.createElement("object");
    // taskSVG.data = "2022-AT-01a_Coloring_Page.svg";
    taskSVG.data = "/question_files/b/3/6/2022_at_01a_question_interactive.svg";
    taskSVG.id = "task-svg";
    taskSVG.height = 300;
    taskContainer.appendChild(taskSVG);

    var selectedColor = null;
    var ArrAreas = [];

    var data = [
        {color: null, connections: [1,2,3,4,5,6,7,8,9,10]}, //0
        {color: null, connections: [0,2]},                  //1
        {color: null, connections: [0,1,9]},                //2
        {color: null, connections: [0,11,4,10]},            //3
        {color: null, connections: [0,11,3,5]},             //4
        {color: null, connections: [0,11,4,6]},             //5
        {color: null, connections: [0,11,5,7]},             //6
        {color: null, connections: [0,11,8,6]},             //7
        {color: null, connections: [0,11,9,7]},             //8
        {color: null, connections: [0,11,10,8,2]},          //9
        {color: null, connections: [0,11,9,3]},             //10
        {color: null, connections: [3,4,5,6,7,8,9,10]}      //11
    ];

    var scratchEl = document.getElementById('scratch');
    if (scratchEl) {
        var iniScratch = unescape(scratchEl.value);
        if (iniScratch != "") {
            let scratchData = JSON.parse(iniScratch);

            scratchData.forEach((color, index) => {
                data[index].color = color;
            });
        }

    }

    taskSVG.addEventListener("load", function () {
        var svgDoc = taskSVG.contentDocument;

        class Area {
            constructor(element, color) {
                this.element = element;
                this.color = color;
                this.connectedAreas = [];
            }

            setColor (color) {
                this.color = color;
                this.element.style.fill = (this.color === null)?  "rgb(255, 255, 255)" : "url(#pattern"+ selectedColor +")";
            }

            hasSameNeighbor() {
                let sharesColor = false;
                this.connectedAreas.forEach(neighbor => {
                    if (neighbor.color === this.color) {
                        sharesColor = true;
                    }
                });

                return sharesColor;
            }
        }

        for (var i = 0; i < data.length; i++) {
            var elArea = svgDoc.getElementById("area" + i);
            let area = new Area(elArea,data[i].color);
            ArrAreas.push(area);
            elArea.value = i;
            elArea.style.cursor = "pointer";
            area.element.style.fill = (data[i].color === null)?  "rgb(255, 255, 255)" : "url(#pattern"+ data[i].color +")";
            elArea.addEventListener("click", function () {
                ArrAreas[this.value].setColor(selectedColor);
            });
        }


        ArrAreas.forEach(function(area, index) {
            data[index].connections.forEach(conn => {
                area.connectedAreas.push(ArrAreas[conn]);
            });

        });

        function validateColors() {

            let emptyCells = false;
            ArrAreas.forEach(obj => {
                if (obj.color === null) {
                    emptyCells = true;
                }
            });

            if (emptyCells) return false;

            // For each cell, check if a neighbor shares a colour
            let collidingColors = false;
            ArrAreas.forEach(obj => {
                if (obj.hasSameNeighbor()) {
                    collidingColors = true;
                }
            });

            return !collidingColors;

        }

        for (var i = 0; i < 3; i++) {
            var color = svgDoc.getElementById("color" + i);
            color.value = i;
            color.style.cursor = "pointer";
            color.addEventListener("click", function () {
                selectedColor = (selectedColor === this.value)? null : this.value;
                var brush = svgDoc.getElementById("brush");
                brush.style.fill = (selectedColor === null)?  "rgb(222, 216, 210)" : "url(#pattern"+ selectedColor +")";
            });
        }

        getScratch = function() {
            let scratchAreas = [];
            ArrAreas.forEach(obj => {
                scratchAreas.push(obj.color);
            });
            return JSON.stringify(scratchAreas);
        }

        getAnswer = function () {
            return validateColors();
        }

    });

});