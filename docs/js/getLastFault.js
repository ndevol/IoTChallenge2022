// Created by Nathaniel DeVol

async function getLastFault(assetId, elementId) {
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?assetId="+assetId;

    // first check the mode (could be empty)
    var mode = "Unknown"
    var url_state = url + "&dataItemId=EquipmentInformation";
    data = await httpGetAsync(url_state);
    // find the most recent message with informationId = 'Mode'
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        payload = JSON.parse(arr[i].payload)
        if (payload["informationId"] == "Mode") {
            mode = payload["value"]
            break
        }
    }

    // if in deployment, look for last alarm
    if (mode == "deploy") {
        var url_fault = url + "&dataItemId=EquipmentAlarm&limit=1";
        httpGetAsync(url_fault).then((data)=>{
            // check if empty
            var arr = JSON.parse(data);
            if (arr.length == 0){
                document.getElementById(elementId).style.backgroundColor = '#32a06d';
                document.getElementById(elementId+"time").innerHTML = "No Faults";
            } else {
                let last_fault = new Date(JSON.parse(arr[0].payload).dateTime);
                let now = new Date();
                let diff = ((now-last_fault) / 1000).toFixed(0); // seconds
        
                // set color
                let color = 'red';
                if (diff > 60*60) {
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
                document.getElementById(elementId+"time").innerHTML = "Last Fault: "+diff+unit;
            }
        });

    } else {
        // otherwise display the current mode in the last fault spot
        document.getElementById(elementId+"time").innerHTML = "Current Stage: "+mode;
    }

};