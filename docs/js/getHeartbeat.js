// Created by Nathaniel DeVol

function getHeartbeat(assetId, elementId) {
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages";
    url += "?assetId="+assetId+"&limit=1"
    httpGetAsync(url).then((data)=>{
        let last_heartbeat = new Date(JSON.parse(JSON.parse(data)[0].payload).dateTime);
        let now = new Date();
        let diff = ((now-last_heartbeat) / 1000).toFixed(0); // seconds

        // set color
        let color = 'red';
        if (diff < 10*60) {
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
    });
};