// Created by Nathaniel DeVol

async function createSVG(assetId, elementId) {
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?assetId="+assetId;

    // first check the mode (could be empty)
    var mode = "Unknown"
    var url_info = url + "&dataItemId=EquipmentInformation";
    data = await httpGetAsync(url_info);
    // find the most recent message with informationId = 'Mode'
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        payload = JSON.parse(arr[i].payload)
        if (payload["informationId"] == "Mode") {
            mode = payload["value"]
            break
        }
    }
    // for testing 
    mode = 'deploy'

    // only proceed if on/off threshold is set
    if (mode == 'deploy' || mode == 'training') {
        var url_state = url + "&dataItemId=EquipmentChangeState"
        
        // get states that define the previous 48 hours
        var now = new Date();
        var firstDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), (now.getHours()-48), now.getMinutes());
        var url_state1 = url_state + "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+
                            "T"+firstDateTime.getHours()+":"+firstDateTime.getMinutes()+"&limit=5000";
        // get the last state before current day
        var url_state2 = url_state + "&endDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+
                            "T"+firstDateTime.getHours()+":"+firstDateTime.getMinutes()+"&limit=1";
        // add the most recent state (before today) to today's state changes
        var previousState = await getDataString(url_state2, 'value');
        var data = await getDataString(url_state1, 'value');

        if (data.length == 0) {
            // no states in the last 48 hours
            data = previousState;
        } else if (previousState.length != 0) {
            // everything is good, add previous state to current state
            data.push(previousState[0])
        }
        
        // just for testing
        // var data = await getDataStringTest1("", 'value');
        // console.log(data)
    
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
            // collect alarm data over the past 48 hours
            var url_alarms = url + "&dataItemId=EquipmentAlarm"
            url_alarms += "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+
                            "T"+firstDateTime.getHours()+":"+firstDateTime.getMinutes()+"&limit=5000";
            var alarms = await getDataString(url_alarms, 'value');

            // just for testing
            // var alarms = await getDataStringTest2("", 'value');

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