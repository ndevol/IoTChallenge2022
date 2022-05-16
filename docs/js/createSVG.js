// Created by Nathaniel DeVol

async function createSVG(assetId, elementId) {
    // set mode 
    var mode;
    if (elementId.split("-")[0] == "3DPrinter") {
        mode = "deploy";
    } else if (elementId.split("-")[0] == "Fan") {
        mode = "training";
    } else {
        mode = "initialization";
    }

    // only proceed if on/off threshold is set
    if (mode == 'deploy' || mode == 'training') {
       
        // get states that define the previous 48 hours
        var now = new Date(2022, 4, 13, 23, 00);
        var firstDateTime = new Date(2022, 4, 11, 23, 00);
        
        if (elementId.split("-")[0] == "3DPrinter") {
            var data_full = await getTestStates1("", 'value');
            data = data_full.filter(row => row[0] > firstDateTime);
            data.push(data_full[data.length]);
        } else if (elementId.split("-")[0] == "Fan") {
            var data_full = await getTestStates2("", 'value');
            data = data_full.filter(row => row[0] > firstDateTime);
            data.push(data_full[data.length]);
        } 

    
        // first cycle through the states to get base color
        var currentDateTime, nextDateTime;
        var svg = document.getElementById(elementId);
        for (var i=data.length-1; i>=0; i--) {
            var color = 'rgba(84,88,90,1)';  // gray
            if (data[i][1] == '"Active"' || data[i][1] == '"ACTIVE"') {
                color = 'rgba(50,160,109,1)'; // green
            } 
            if (i == data.length-1){
                // initialize to midnight on the first day
                currentDateTime = firstDateTime;
            } else {
                currentDateTime = new Date(data[i][0]);    //do I need the Date?
            }
            if (i == 0){
                nextDateTime = now;
            } else {
                nextDateTime = new Date(data[i-1][0]);
            }
            var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            // set x and width based on time
            var x = String((currentDateTime - firstDateTime)/(48*60*60*1000)*100) + "%";
            var width = String((nextDateTime - currentDateTime)/(48*60*60*1000)*100) + "%";
            newRect.setAttribute("x", x);
            newRect.setAttribute("y", "0");
            newRect.setAttribute("width", width);
            newRect.setAttribute("height", "100%");
            newRect.setAttribute("fill", color);
            svg.appendChild(newRect);
        }

        // now add red stripes for alarms (if in deploy)
        if (mode == 'deploy') {
            var alarms = await getTestAlarms1("", 'value');
            alarms = alarms.filter(row => row[0] > firstDateTime);

            // var color = 'rgba(217,83,79,1)';
            var color = 'red';
            for (var i=alarms.length-1; i>=0; i--) {
                currentDateTime = new Date(alarms[i][0]);    //do I need the Date?
                var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                // set x and width based on time
                var x = String((currentDateTime - firstDateTime)/(48*60*60*1000)*100) + "%";
                newRect.setAttribute("x", x);
                newRect.setAttribute("y", "0");
                newRect.setAttribute("width", "1%");
                newRect.setAttribute("height", "100%");
                newRect.setAttribute("fill", color);
                svg.appendChild(newRect);
            }
        }
    }
}