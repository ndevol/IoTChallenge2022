// Created by Nathaniel DeVol

async function getLastFault(assetId, elementId) {
    // set mode 
    if (elementId.split("-")[0] == "3DPrinter") {
        mode = "deploy";
    } else if (elementId.split("-")[0] == "Fan") {
        mode = "training";
    } else {
        mode = "initialization";
    }

    // if in deployment, look for last alarm
    if (mode == "deploy") {
        var arr = await getTestAlarms1("", 'value');
        // check if empty
        if (arr.length == 0){
            document.getElementById(elementId).style.backgroundColor = '#32a06d';
            document.getElementById(elementId+"time").innerHTML = "No Faults";
        } else {
            let last_fault = new Date(arr[0][0]);
            var now = new Date(2022, 4, 13, 13, 00);
            let diff = ((now-last_fault) / 1000).toFixed(0); // seconds
    
            // set color
            let color = 'red';
            if (diff > 6*60*60) {
                // color = 'green';
                color = '#32a06d';
            }
    
            // set units and rescale
            var unit = " sec";
            if (diff/(60*60*24) > 1) {
                diff = (diff/(60*60*24)).toFixed(0)
                unit = " day"
            } else if (diff/(60*60) > 1) {
                diff = (diff/(60*60)).toFixed(0)
                unit = " hours"
            } else if (diff/60 > 1) {
                diff = (diff/60).toFixed(0)
                unit = " min"
            }
    
            document.getElementById(elementId).style.backgroundColor = color;
            document.getElementById(elementId+"time").innerHTML = "Last Fault: "+diff+unit;
        }

    } else {
        // otherwise display the current mode in the last fault spot
        document.getElementById(elementId).style.backgroundColor = '#54585A';
        document.getElementById(elementId+"time").innerHTML = "Current Stage: "+mode;
    }

};