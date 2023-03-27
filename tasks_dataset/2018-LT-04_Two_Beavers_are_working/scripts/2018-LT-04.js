//Polyfill for the `includes()` method for I.E.
if (!Array.prototype.includes) {Object.defineProperty(Array.prototype, 'includes', {value: function(searchElement, fromIndex) {if (this == null) {throw new TypeError('"this" is null or not defined');}var o = Object(this);var len = o.length >>> 0;if (len === 0) {return false;}var n = fromIndex | 0;var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);while (k < len) {if (o[k] === searchElement) {return true;}k++;}return false;}});}

//Polyfill for the `remove()` method for I.E.9
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {arr.forEach(function (item) {if (item.hasOwnProperty('remove')) {return;}Object.defineProperty(item, 'remove', {configurable: true,enumerable: true,writable: true,value: function remove() {if (this.parentNode !== null)this.parentNode.removeChild(this);}});});})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

//Polyfill for the `indexOf()` method 
if (!Array.prototype.indexOf) { Array.prototype.indexOf = function(searchElement, fromIndex) { var k; if (this == null) { throw new TypeError('"this" is null or not defined'); } var o = Object(this); var len = o.length >>> 0; if (len === 0) { return -1; } var n = +fromIndex || 0; if (Math.abs(n) === Infinity) { n = 0; } if (n >= len) { return -1; } k = Math.max(n >= 0 ? n : len - Math.abs(n), 0); while (k < len) { if (k in o && o[k] === searchElement) { return k; } k++; } return -1; }; }

task = null;
$(function(){
	$('#task-container').append("<div id=\"task-area-test\" style=\"position: relative;\"></div>");
	createTask();
	task.load();
});

function createTask() {
	var params = {
		height: 0,
		width: 0
	};
	
	params.loaded = function() {
        
        var answer = 0;
        
        var row = [[],[]];
        
        var timeslots = [
            {
                activity: "A", time: 2, color: "#4780ff", inactive: "#838383"
            },
            {
                activity: "B", time: 3, color: "#9ef552", inactive: "#a2a2a2"
            },
            {
                activity: "C", time: 5, color: "#74cce6", inactive: "#aeaeae"
            },
            {
                activity: "D", time: 7, color: "#259da2", inactive: "#6e6e6e"
            },
            {
                activity: "E", time: 10, color: "#d8ed77", inactive: "#bababa", constraints: ["A", "B"]
            },
            {
                activity: "F", time: 9, color: "#e2bd45", inactive: "#9c9c9c", constraints: ["C"]
            },
            {
                activity: "G", time: 4, color: "#52f5b0", inactive: "#a6a6a6", constraints: ["D"]
            },
            {
                activity: "H", time: 6, color: "#21cda1", inactive: "#7f7f7f", constraints: ["A", "B", "E"]
            }
        ];
        
        var html = "";
        
        html += "<style> div, table, th, td { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } table, th, td { color: black !important; font-family: Arial, Helvetica, sans-serif !important; border: 1px solid black !important; border-collapse: collapse !important; } table { margin: 0px !important; } th, td { height: 50px !important; padding: 0px !important; } th { padding-left: 10px !important; padding-right: 10px !important;} td { min-width: 100px !important; } </style>";
        
        html += "<div id='row2' value='2' style='width: 460px; height: 50px; border: 1px solid black;'></div><br>";
        
        html += "<table><tr>";
		//With text to translate in Taskinterface: 
		//html += "<th>"+ i18n_strings.beaver1 +"</th>";
        //with pictures
        html += "<th><img src='/question_files/f/c/0/2018_lt_04_beaver1.svg' height='30px'></th>";
		
        html += "<td id='row0' value='0'></td>";
        
        html += "</tr><tr>";
       		//With text to translate in Taskinterface: 
		//html += "<th>"+ i18n_strings.beaver2 +"</th>";
		 // with pictures
        html += "<th><img src='/question_files/a/a/6/2018_lt_04_beaver2.svg' height='30px'></th>";
        html += "<td id='row1' value='1' style='width: 460px;'></td>";
        
        html += "</tr></table><br>";
        
        document.getElementById("task-container").innerHTML += html;
        
        for(var i = 0; i < 8; i++) {
            var card = "<div id='card"+ i +"' value='"+ i +"' style='display: table-cell; vertical-align: middle; width: "+ (timeslots[i].time * 10) +"px; height: 50px; background: "+ timeslots[i].color +"; text-align: center; font-weight: bold; font-family: Arial, Helvetica, sans-serif !important; font-size: 16px !important; ";
            
            if(i < 4){
                card += "color: black !important;' draggable='true'"
            }else{
                card += "color: #333333 !important; background: "+ timeslots[i].inactive +";'";
            }
            
            card += ">"+ timeslots[i].activity +"</div>";
            
            document.getElementById("row2").innerHTML += card;
		}
        
        for(var i = 0;i < 8;i++) {
			document.getElementById("card" + i).addEventListener("dragstart", function(e){
				e.dataTransfer.setData('text', this.id);
			});
		}
        
        for(var i = 0; i < 3; i++){
			document.getElementById("row" + i).addEventListener("dragover", function(e){
				e.preventDefault();
			});
			
			document.getElementById("row" + i).addEventListener("drop", function(e){
                e.preventDefault();
                
                var elem = document.getElementById(e.dataTransfer.getData('text'));
                this.appendChild(elem);
                
                readRows();
                
				
			});
		}
        
        function readRows(){
            for(var i = 0; i < 2; i++){
                var children = document.getElementById("row"+ i).childNodes;
                var activityOrder = [];
                
                for(var j = 0; j < children.length; j++){
                    activityOrder.push(children[j].id);
                }
                
                if(activityOrder.includes("card4")){
                    if(activityOrder.indexOf("card0") > activityOrder.indexOf("card4") || activityOrder.indexOf("card1") > activityOrder.indexOf("card4")){
                        activityOrder = resetCard(activityOrder, 4);
                    }
                }
                
                if(activityOrder.includes("card7")){
                    if(activityOrder.indexOf("card0") > activityOrder.indexOf("card7") || activityOrder.indexOf("card1") > activityOrder.indexOf("card7") || activityOrder.indexOf("card4") > activityOrder.indexOf("card7")){
                        activityOrder = resetCard(activityOrder, 7);
                    }
                }
                
                if(activityOrder.includes("card5")){
                    if(activityOrder.indexOf("card2") > activityOrder.indexOf("card5")){
                        activityOrder = resetCard(activityOrder, 5);
                        console.log("True");
                    }
                }
                
                if(activityOrder.includes("card6")){
                    if(activityOrder.indexOf("card3") > activityOrder.indexOf("card6")){
                        activityOrder = resetCard(activityOrder, 6);
                    }
                }
            }
            
            function resetCard(array, value){
                document.getElementById("card"+ value).draggable = false;
                document.getElementById("card"+ value).style.color = "#333333";
                document.getElementById("card"+ value).style.background = timeslots[value].inactive;
                document.getElementById("row2").appendChild(document.getElementById("card"+ value));
                
                array.splice(array.indexOf("card"+ value), 1);
                
                return array;
            }
            
            for(var i = 0; i < timeslots.length; i++){
                if(document.getElementById("placeHolder"+ i)){
                    document.getElementById("placeHolder"+ i).remove();
                }
            }
            
            row = [[],[]];
            
            for(var i = 0; i < 2; i++){
                var children = document.getElementById("row"+ i).childNodes;
                for(var j = 0; j < children.length; j++){
                    var activity = timeslots[children[j].getAttribute("value")];
                    for(var k = 0; k < activity.time; k++){
                        row[i].push(activity.activity);
                    }
                }
            }
            
            for(var i = 0; i < timeslots.length; i++){
                var constraints = timeslots[i].constraints;
                if(constraints !== undefined){
                    
                    var constrCheck = [];
                    for(var j = 0; j < constraints.length; j++){
                        
                        if(row[0].includes(constraints[j]) || row[1].includes(constraints[j])){
                            constrCheck.push(true);
                        }else{
                            constrCheck.push(false);
                        }
                    }
                    
                    if(!constrCheck.includes(false)){
                        document.getElementById("card"+ i).draggable = true;
                        document.getElementById("card"+ i).style.color = "black";
                        document.getElementById("card"+ i).style.background = timeslots[i].color;
                    }else{
                        document.getElementById("card"+ i).draggable = false;
                        document.getElementById("card"+ i).style.color = "#333333";
                        document.getElementById("card"+ i).style.background = timeslots[i].inactive;
                        
                        if(row[0].includes(timeslots[i].activity) || row[1].includes(timeslots[i].activity)){
                            document.getElementById("row2").appendChild(document.getElementById("card"+ i));
                        }
                    }
                }
            }
            
            var rowLength;
            if(row[0].length > row[1].length){
                rowLength = row[0].length;
            }else{
                rowLength = row[1].length;
            }
            
            var orderArray = [];
            for(var i = 0; i < rowLength; i++){
                for(var j = 0; j < 2; j++){
                    if(row[j][i] === "E"){
                        if(!orderArray.includes("E")){
                            orderArray.push("E");
                        }
                    }else if(row[j][i] === "H"){
                        if(!orderArray.includes("H")){
                            orderArray.push("H");
                        }
                    }else if(row[j][i] === "F"){
                        if(!orderArray.includes("F")){
                            orderArray.push("F");
                        }
                    }else if(row[j][i] === "G"){
                        if(!orderArray.includes("G")){
                            orderArray.push("G");
                        }
                    }
                }
            }
            
            for(var i = 0; i < orderArray.length; i++){
                if(orderArray[i] === "E"){
                    var startPos = Math.max.apply(null, getPos([0, 1]));
                    createPlaceHolder(4, startPos);
                }else if(orderArray[i] === "H"){
                    var startPos = Math.max.apply(null, getPos([0, 1, 4]));
                    createPlaceHolder(7, startPos);
                }else if(orderArray[i] === "F"){
                    var startPos = Math.max.apply(null, getPos([2]));
                    createPlaceHolder(5, startPos);
                }else if(orderArray[i] === "G"){
                    var startPos = Math.max.apply(null, getPos([3]));
                    createPlaceHolder(6, startPos);
                }
            }
            
            function getPos(requirements){
                var positions = [];
                for(var i = 0; i < requirements.length; i++){
                    for(var j = 0; j < 2; j++){
                        if(row[j].includes(timeslots[requirements[i]].activity)){
                            positions.push(row[j].indexOf(timeslots[requirements[i]].activity) + timeslots[requirements[i]].time);
                        }
                    }
                }
                return positions;
            }
            
            function createPlaceHolder(activityValue, startPos){
                for(var i = 0; i < 2; i++){
                    if(row[i].includes(timeslots[activityValue].activity)){
                        
                        if(row[i].indexOf(timeslots[activityValue].activity) < startPos){
                            
                            placeHolderWidth = 0;
                            for(var j = row[i].indexOf(timeslots[activityValue].activity); j < startPos; j++){
                                row[i].splice(j, 0, "X");
                                placeHolderWidth++;
                            }
                            
                            var placeHolder = document.createElement("DIV");
                            placeHolder.id = "placeHolder"+ activityValue;
                            placeHolder.style.height = "50px";
                            placeHolder.style.width = (placeHolderWidth * 10) + "px";
                            placeHolder.style.display = "table-cell";
                            placeHolder.style.background = "#000000";
                            
                            document.getElementById("row"+ i).insertBefore(placeHolder, document.getElementById("card"+ activityValue));
                        }
                    }
                }
            }
            
            var rowLength;
            if(row[0].length > row[1].length){
                rowLength = row[0].length;
            }else{
                rowLength = row[1].length;
            }
            answer = rowLength;
        }
        
        task.getAnswer = function(){
            var result = 0;
            
            //if not all elements are used, the task is wrong.
            if(document.getElementById("row2").childNodes.length === 0){
                result = answer;
            }
            
			return result;
		};
        
        task.getScratch = function(){
            var scratch = [[],[]];
            for(var i = 0; i < 2; i++){
                var children = document.getElementById("row"+ i).childNodes;
                for(var j = 0; j < children.length; j++){
                    for(var m = 0; m < timeslots.length; m++){
                        if(children[j].id === "card"+ m){
                            scratch[i].push("card" + m);
                        }
                    }
                }
            }
            return JSON.stringify(scratch);
        }
        
        var answerEl = document.getElementById('answer');
        //answerEl = {value:"32"};
        if(answerEl){
            var iniAnswer = answerEl.value;
            if(iniAnswer != ""){
                var iniAnswer = unescape(iniAnswer);
                answer = iniAnswer;
            }
        }
        
        var scratchEl = document.getElementById('scratch');
        //scratchEl = {value:'[["card0","card4","card2","card5","card3"],["card1","card7","card6"]]'};
        if(scratchEl){
            var iniScratch = scratchEl.value;
            if(iniScratch != ""){
                var iniScratch = eval(unescape(iniScratch));
                for(var i = 0; i < 2; i++){
                    for(var j = 0; j < iniScratch[i].length; j++){
                        document.getElementById("row"+ i).appendChild(document.getElementById(iniScratch[i][j]));
                    }
                }
                readRows();
            }
        }
    };
	task = new Task('#task-area-test', params);
}