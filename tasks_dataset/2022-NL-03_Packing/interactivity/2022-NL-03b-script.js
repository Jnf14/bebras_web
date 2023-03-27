document.addEventListener("DOMContentLoaded", function (event) {
    var taskContainer = document.getElementById("task-container");
    var gridSize = 30;
    var style = document.createElement('style');
    style.innerHTML = '.bbrs-grid-wrapper {display: grid; grid-template-columns: repeat(14, 1fr); grid-template-rows: repeat(9, 1fr); grid-column-gap: 0px; grid-row-gap: 0px; width: fit-content; padding: 15px;}' +
        '.bbrs-block-wrapper {padding: 5px; height: 150px; display: grid; grid-template-columns: repeat(4, 150px); width: fit-content; grid-gap: 15px; place-items: center;}' +
        '.bbrs-grid-cell {width: ' + gridSize + 'px; height: ' + gridSize + 'px; display: inline-block; background-color: #e0d4bb; box-shadow: 1px 0 0 0 #000, 0 1px 0 0 #000, 1px 1px 0 0 #000, 1px 0 0 0 #000 inset, 0 1px 0 0 #000 inset} ' +
        '.bbrs-grid-cell.relative {position: relative;}' +
        '.bbrs-block-wrapper .bbrs-draggable {z-index: 1;}' +
        '.bbrs-grid-wrapper .bbrs-draggable {top: 0; left: 0; position: absolute;}' +
        '.bbrs-draggable  {background-repeat: repeat;  background-size: ' + gridSize + 'px ' + gridSize + 'px; display: grid; grid-template-columns: repeat(2, 1fr); grid-template-areas: "a b";}' +
        '.bbrs-draggable.rotated {grid-template-columns: repeat(1, 1fr); grid-template-areas: "a" "b";}' +
        '.bbrs-draggable.rotated .bbrs-rotate {align-self: end;}' +
        '.bbrs-draggable.no-touch, .bbrs-draggable.no-touch * {pointer-events: none;}' +
        '.bbrs-draggable.active-drag { z-index: 2; }' +
        '.bbrs-rotate {width: ' + gridSize + 'px; height: ' + gridSize + 'px; cursor: pointer; grid-area: b; justify-self: end;}' +
        '.bbrs-grab {font-size: ' + gridSize + 'px; font-weight: bold; color: #ffffff; text-align: center; float: left; width: ' + gridSize + 'px; height: ' + gridSize + 'px; cursor: grab; display: flex; justify-content: center;  -webkit-text-fill-color: white;   -webkit-text-stroke-width: 1px;   -webkit-text-stroke-color: black; grid-area: a;}';
    document.head.appendChild(style);

    var taskWrapper = document.createElement("div");

    var blockWrapper = document.createElement("div");
    blockWrapper.classList.add("bbrs-block-wrapper");
    taskWrapper.appendChild(blockWrapper);

    var gridWrapper = document.createElement("div");
    gridWrapper.classList.add("bbrs-grid-wrapper");
    taskWrapper.appendChild(gridWrapper);
    taskContainer.appendChild(taskWrapper);

    // var taskImages = ["draggable1.svg", "draggable2.svg", "draggable3.svg", "draggable4.svg", "rotate.svg"];
    var taskImages = ["/question_files/8/1/9/2022_nl_03b_draggable1.svg", "/question_files/e/0/c/2022_nl_03b_draggable2.svg", "/question_files/b/6/9/2022_nl_03b_draggable3.svg", "/question_files/e/9/8/2022_nl_03b_draggable4.svg", "/question_files/f/9/3/2022_nl_03b_rotate.svg"];

    var draggablesData = [
        {width: 5, height: 1,  src: taskImages[0], row: null, column: null, rotated: false},
        {width: 3, height: 2,  src: taskImages[1], row: null, column: null, rotated: false},
        {width: 4, height: 3,  src: taskImages[2], row: null, column: null, rotated: false},
        {width: 5, height: 3,  src: taskImages[3], row: null, column: null, rotated: false},
    ];

    var scratchEl = document.getElementById('scratch');
    if (scratchEl) {
        var iniScratch = unescape(scratchEl.value);
        if (iniScratch != "") {

            let scratchData = JSON.parse(iniScratch);

            scratchData.forEach((data, index) => {
                draggablesData[index].row = data.row;
                draggablesData[index].column = data.column;
                draggablesData[index].rotated = data.rotated;
            });
        }
    }


    const rowLimit = 8;
    const columnLimit = 13;
    const crates = [];



    class Crate {
        constructor(width, height, src, row = null, column = null, rotateAfterGeneration = false) {

            this.width = width;
            this.height = height;

            // The row and column make up the anchor point. You always render it from that position.
            this.row = row;
            this.column = column;

            this.rotated = false;
            this.parent = null;

            crates.push(this);

            this.element = document.createElement("div");
            this.element.classList.add("bbrs-draggable");
            this.element.style.backgroundImage = "url(" + src + ")";
            this.element.value = crates.length - 1; // the current index (note the instance is already pushed to the array a few lines above).

            this.handle = document.createElement("div");
            this.handle.textContent = "+";
            this.handle.classList.add("bbrs-grab");
            this.handle.addEventListener("bbsDragStart", e => {
                e.detail.setDraggable(this.element);
                this.element.classList.add("active-drag");
                crates.forEach(crate => {
                    crate.element.classList.add("no-touch");
                });
            });
            this.element.appendChild(this.handle);

            this.buttonRotate = document.createElement("img");
            this.buttonRotate.src = taskImages[4];
            this.buttonRotate.classList.add("bbrs-rotate");
            this.buttonRotate.draggable = false;
            this.buttonRotate.addEventListener("click", e => {
                this.rotate();
            });
            this.element.appendChild(this.buttonRotate);

            if (rotateAfterGeneration) {
              this.rotate();
            }

            // If row and column are given, move it into the correct gridcell. If nothing is given, place it in the default blockWrapper
            if (row !== null && column !== null) {
                this.move(row, column);
            } else {
                blockWrapper.appendChild(this.element);
            }

            this.render();
        }

        move(row, column) {
            if (row + (this.height - 1) > rowLimit || column + (this.width - 1) > columnLimit) {
                return;
            }

            this.row = row;
            this.column = column;

            this.getCollidingCrates(row, column).forEach(crate => {
                crate.reset();
            });


            let cell = document.querySelector("div.bbrs-grid-cell[data-row='"+row+"'][data-column='"+column+"']");

            if (this.parent) {
                this.parent.classList.remove("relative");
            }
            this.parent = cell;

            this.parent.classList.add("relative");
            this.parent.appendChild(this.element);

        }


        /**
         * @return Crate[]
         */
        getCollidingCrates(row, column) {
            if (row === null || column === null) return [];

            let collidingCrates = [];
            crates.forEach(crate => {
                if (crate === this) return;

                for (let i = 0; i < this.height; i++) {
                    let checkRow = row + i;

                    for (let j = 0; j < this.width; j++) {
                        let checkColumn = column + j;

                        if (crate.isOccupyingPosition(checkRow, checkColumn)) {

                            if (!collidingCrates.includes(crate)) {
                                collidingCrates.push(crate);
                            }

                        }
                    }
                }
            });

            return collidingCrates;
        }

        /**
         * Does this Crate occupy the given position
         * @param row
         * @param column
         */
        isOccupyingPosition(row, column) {
            if (this.row === null || this.column === null) {
                return false;
            }

            let heightRange = this.row + (this.height - 1)

            let widthRange = this.column + (this.width - 1);

            if (row >= this.row && row <= heightRange && column >= this.column && column <= widthRange) {
                return true;
            }

            return false;
        }


        rotate() {
            // Do not rotate if the grid range is exceeded
            if (this.row + (this.width - 1) > rowLimit || this.column + (this.height - 1) > columnLimit) {
                return;
            }

            this.rotated = !(this.rotated);

            let oldHeight = this.height;
            // noinspection JSSuspiciousNameCombination
            this.height = this.width;
            // noinspection JSSuspiciousNameCombination
            this.width = oldHeight;

            this.getCollidingCrates(this.row, this.column).forEach(crate => {
                crate.reset();
            });

            this.render();
        }

        /**
         * I only render the element, I do not modify any values
         */
        render() {
            this.element.style.width = this.width * gridSize + "px";
            this.element.style.height = this.height * gridSize + "px";

            if (this.rotated) {
                this.element.classList.add("rotated");
            } else {
                this.element.classList.remove("rotated");
            }
        }

        reset() {
            this.row = null;
            this.column = null;

            blockWrapper.appendChild(this.element);

            if (this.parent) {
                this.parent.classList.remove("relative");
                this.parent = null;
            }
        }
    }








    var cells = [];
    for (var row = 0; row < (rowLimit + 1); row++) {
        for (var column = 0; column < (columnLimit + 1); column++) {

            var cell = document.createElement("div");
            cell.classList.add("bbrs-grid-cell");
            cell.dataset.row = row;
            cell.dataset.column = column;
            gridWrapper.appendChild(cell);

            cell.addEventListener("bbsDrop", function (e) {
                e.stopPropagation();
                var data = e.detail.getDraggable();
                if (data) {
                    let currentCrate = crates[data.value];
                    stopDragging(currentCrate);

                    currentCrate.move(parseInt(this.dataset.row), parseInt(this.dataset.column));
                }
            });
        }
    }



    draggablesData.forEach(draggable => {
        let newCrate = new Crate(draggable.width, draggable.height, draggable.src, draggable.row, draggable.column, draggable.rotated);
    });



    function stopDragging(crate) {
        crate.element.classList.remove("active-drag");

        crates.forEach(crate => {
            crate.element.classList.remove("no-touch");
        });
    }

    document.addEventListener("bbsDragEnd", e => {
        var data = e.detail.getDraggable();
        if (data) {

            let crate = crates[data.value];
            if (crate.row !== null || crate.column !== null) {
                crate.reset();
            }

            stopDragging(crate);
        }
    });

    document.addEventListener("bbsDrop", e => {
        var data = e.detail.getDraggable();
        if (data) {
            let crate = crates[data.value];
            if (crate.row !== null || crate.column !== null) {
                crate.reset();
            }

            stopDragging(crate);
        }
    });


    getAnswer = function() {
        let usedCells = [];
        let topLeftRow = 99;
        let topLeftColumn = 99;
        let bottomRightRow = 0;
        let bottomRightColumn = 0;

        let incomplete = false;

        crates.forEach(crate => {
            if (crate.row === null || crate.column === null) {
                incomplete = true;
                return;
            }

            if (crate.row < topLeftRow) {
                topLeftRow = crate.row;
            }

            if (crate.column < topLeftColumn) {
                topLeftColumn = crate.column;
            }

            let highestRow = crate.row + (crate.height - 1);
            if (highestRow > bottomRightRow) {
                bottomRightRow = highestRow;
            }

            let highestColumn = crate.column + (crate.width - 1);
            if (highestColumn > bottomRightColumn) {
                bottomRightColumn = highestColumn;
            }

            for (let i = 0; i < crate.height; i++) {
                let checkRow = crate.row + i;

                for (let j = 0; j < crate.width; j++) {
                    let checkColumn = crate.column + j;
                    usedCells.push(checkRow + "-" + checkColumn);
                }
            }
        });

        if (incomplete) return 9999;


        let height = (bottomRightRow - topLeftRow) + 1;
        let width = (bottomRightColumn - topLeftColumn) + 1;
        let totalCells = width * height;
        return totalCells - usedCells.length;
    }

    getScratch = function() {
        let scratchCrates = [];

        crates.forEach(crate => {
            scratchCrates.push({
                column: crate.column,
                row: crate.row,
                rotated: crate.rotated
            });
        });

        return JSON.stringify(scratchCrates);
    }


});


