// Created by Nathaniel DeVol

function getHeartbeat(assetId, elementId) {
    diff = (Math.random() * 60).toFixed(0);  // seconds

    // set color
    let color = 'red';
    if (diff < 5*60) {
        // color = 'green';
        color = '#32a06d';
    }

    // set units and rescale
    var unit = " sec";
    if (diff/(60*60*24) > 1) {
        diff = (diff/(60*60*24)).toFixed(0)
        unit = " days"
    } else if (diff/(60*60) > 1) {
        diff = (diff/(60*60)).toFixed(0)
        unit = " hours"
    } else if (diff/60 > 1) {
        diff = (diff/60).toFixed(0)
        unit = " min"
    }

    document.getElementById(elementId).style.backgroundColor = color;
    document.getElementById(elementId+"time").innerHTML = "Last Heartbeat: "+diff+unit;
};