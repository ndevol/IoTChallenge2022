// Created by Nathaniel DeVol
async function generatePlots(assetId, idx=false){
    // dataItemIds, elementIds are global variables 
    // idx should be a list [1], [1,4], ...
    if (idx){
        idx.forEach(i => generatePlot(dataItemIds[i], elementIds[i], assetId));
    } else {
        // generate all plots
        for(var i = 0; i < dataItemIds.length; i++) {
            generatePlot(dataItemIds[i], elementIds[i], assetId);
        }
    }

    // // dataItemIds.length must equal elementIds.length
    // for(var i = 0; i < dataItemIds.length; i++) {
    //     await generatePlot(dataItemIds[i], elementIds[i], startTime, endTime, assetId);
    // }
}


async function generatePlot(dataItemId, elementId, assetId, days=1) { //
    // startTime, endTime are global variables 
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?";
    url += "assetId=" + assetId; 
    url += "&dataItemId=" + dataItemId;
    var now = new Date();
    var firstDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));

    url += "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+
                    "T"+firstDateTime.getHours()+":"+firstDateTime.getMinutes()+"&limit=5000";
    var data = await getDataString(url, 'value');
    // for testing only
    var data = await getDataStringTest2("", 'value');

    // console.log(data);
    var x = data.map(function(value,index) { return value[0]; });
    var y = data.map(function(value,index) { return 1; });
    var plotdata = [{
        x: x,
        y: y,
        mode: 'lines+markers',
        type: 'scatter',
        marker : {
            color: '#B3A369'
        },
        line: {
            color: '#B3A369'
        }
    }];
    var layout = {
        // title: {
        //     text: dataItemId,
        //     font: {
        //         color: 'white'
        //     }
        // },
        uirevision:'true',
        margin: {
            b: 'auto',
            l: 40,
            r: 10,
            t: 10
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            mirror: true
        },
        yaxis: {
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            mirror: true
        }
    };
    var config = {responsive: true};
    Plotly.react(document.getElementById(elementId), plotdata, layout, config);
}


function generatePlotsTimestream(assetId, idx=false) {
    // dataItemIds and elementIds are global variables 
    // idx should be a list [1], [1,4], ...
    if (idx){
        idx.forEach(i => generatePlotTimestream(dataItemIds[i], elementIds[i], assetId));
    } else {
        // generate all plots
        for(var i = 0; i < dataItemIds.length; i++) {
            generatePlotTimestream(dataItemIds[i], elementIds[i], assetId);
        }
    }
}


function generatePlotTimestream(dataItemId, elementId, assetId) {
    const url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/timestream?assetId=" + assetId + "&limit=50&dataItemId=";
    // get initial position data
    getData(url+dataItemId, 'measure_value::varchar')
    .then((data)=>{
        // console.log(data)
        var x = data.map(function(value,index) { return value[0]; });
        var y = data.map(function(value,index) { return value[1]; });
        var plotdata = [{
            x: x,
            y: y,
            mode: 'lines+markers',
            type: 'scatter',
            marker : {
                color: '#B3A369'
            },
            line: {
                color: '#B3A369'
            }
        }];
        var layout = {
            // title: {
            //     text: dataItemId,
            //     font: {
            //         color: 'white'
            //     }
            // },
            uirevision:'true',
            margin: {
                b: 'auto',
                l: 40,
                r: 10,
                t: 10
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
                color: 'white',
                linecolor: 'white',
                linewidth: 1,
                mirror: true
            },
            yaxis: {
                color: 'white',
                linecolor: 'white',
                linewidth: 1,
                mirror: true
            }
        };
        var config = {responsive: true};
        Plotly.react(document.getElementById(elementId), plotdata, layout, config);
    });
}


function generatePlotTimestreamTable(dataItemId, elementId, assetId, days) {
    const url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/timestream-tables?table=" + assetId 
                    + "&dataItemId=" + dataItemId  + "&hours=" + (days*24);
    console.log(url);
    // get initial position data
    getData(url, 'value')
    .then((data)=>{
        // console.log(data)
        var x = data.map(function(value,index) { return value[0]; });
        var y = data.map(function(value,index) { return value[1]; });
        var plotdata = [{
            x: x,
            y: y,
            mode: 'lines+markers',
            type: 'scatter',
            marker : {
                color: '#B3A369'
            },
            line: {
                color: '#B3A369'
            }
        }];
        var layout = {
            margin: {
                b: 'auto',
                l: 40,
                r: 10,
                t: 10
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
                color: 'white',
                linecolor: 'white',
                linewidth: 1,
                mirror: true
            },
            yaxis: {
                color: 'white',
                linecolor: 'white',
                linewidth: 1,
                mirror: true
            }
        };
        var config = {responsive: true};
        Plotly.react(document.getElementById(elementId), plotdata, layout, config);
    });
}


function generateHistTimestreamTable(dataItemId, elementId, assetId) {
    const url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/timestream-tables?table=" + assetId 
                    + "&dataItemId=" + dataItemId + "&hours=24";
    console.log(url);
    // get initial position data
    getData(url, 'value')
    .then((data)=>{
        // console.log(data)
        var x = data.map(function(value,index) { return value[1]; });
        var plotdata = [{
            x: x,
            type: 'histogram',
            histnorm: 'probability',
            marker : {
                color: '#B3A369'
            },
            name: "Last Day"
        },
            // plot most recent values in different color
            {
            x: x.slice(0,200),
            type: 'histogram',
            histnorm: 'probability',
            opacity: 0.5,
            marker : {
                color: '#D6DBD4'
            },
            name: "Last 200 Values"
        }];
        var layout = {
            barmode: "overlay",
            margin: {
                b: 20,
                l: 40,
                r: 10,
                t: 10
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
                color: 'white',
                linecolor: 'white',
                linewidth: 1,
                mirror: true
            },
            yaxis: {
                color: 'white',
                linecolor: 'white',
                linewidth: 1,
                mirror: true
            },
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1,
                font: {
                    color: '#FFFFFF'
                },
            }
        };
        var config = {responsive: true};
        Plotly.react(document.getElementById(elementId), plotdata, layout, config);
    });
}


async function generateWarmupPlot(elementId, assetId) {
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/messages-proxy?assetId=" 
                + assetId + "&dataItemId=program&limit=50"
    var data = await httpGetAsync(url);
    // determine last warmup program, start is start time
    var warmup = [];
    var warmup_end = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        if (arr[i].value == '"VC500AM_WARMUP2"'){
            warmup = [new Date(arr[i].dateTime), arr[i].value];
            break;
        } else {
            warmup_end = [new Date(arr[i].dateTime), arr[i].value];
        }
    }
    // check for next program, if none it's running so end time is current time, 
    // if another program end time is when the other program appears
    if (warmup_end.length == 0) {
        warmup_end = [new Date(), "warmup_running"]
    }
    console.log(warmup)
    console.log(warmup_end)
    // query the vibration rms between those times
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/messages-proxy?assetId=" 
                + assetId + "&dataItemId=vibration&startDateTime=" + warmup[0].toISOString().replace(".","+")
                + "&endDateTime=" + warmup_end[0].toISOString().replace(".","+") + "&limit=100"
    // plot
    getDataPayload(url, 'rms')
    .then((data)=>{
        console.log(data)
        var x = data.map(function(value,index) { return value[0]; });
        var y = data.map(function(value,index) { return value[1]; });
        var plotdata = [{
            x: x,
            y: y,
            mode: 'lines+markers',
            type: 'scatter',
            marker : {
                color: '#B3A369'
            },
            line: {
                color: '#B3A369'
            }
        }];
        // this works to maintain zoom, but should look into uirevision
        // https://plotly.com/javascript/uirevision/
        if (typeof(document.getElementById(elementId).layout) == 'undefined') {
            var layout = {
                title: {
                    text: "Warmup Vibration",
                    font: {
                        color: 'white'
                    }
                },
                margin: {
                    b: 'auto',
                    l: 40,
                    r: 10,
                    t: 40
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                xaxis: {
                    color: 'white',
                    linecolor: 'white',
                    linewidth: 1,
                    mirror: true
                },
                yaxis: {
                    color: 'white',
                    linecolor: 'white',
                    linewidth: 1,
                    mirror: true
                }
            };
        } else {
            var layout = document.getElementById(elementId).layout;
        }
        var config = {responsive: true};
        Plotly.react(document.getElementById(elementId), plotdata, layout, config);
    });
}


async function generateStatePlot(elementId, assetId, dataItemId, days){
    var url_base = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?";
    url_base += "assetId=" + assetId; 
    url_base += "&dataItemId=" + dataItemId;
    // get state from midnight
    var now = new Date();
    var firstDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));
    url = url_base + "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+"T00:00&limit=5000";
    // get the last state before current day
    url2 = url_base + "&endDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+"T00:00&limit=1";
    console.log(url)

    // add the most recent state (before today) to today's state changes
    var previousState = await getDataString(url2, 'value');
    var data = await getDataString(url, 'value');
    // data.push(previousState[0])
    if (data.length == 0) {
        // no states in the last 48 hours
        data = previousState;
    } else if (previousState.length != 0) {
        // everything is good, add previous state to current state
        data.push(previousState[0])
    }


    // create plot data
    var plot_data = [];
    var currentDateTime, nextDateTime;
    for (var i=data.length-1; i>=0; i--) {
        var color = 'rgba(255,193,7,1)';
        if (data[i][1] == '"Active"' || data[i][1] == '"ACTIVE"') {
            color = 'rgba(50,160,109,1)'
        } else if (data[i][1] == '"Stopped"' || data[i][1] == '"STOPPED"') {
            color = 'rgba(217,83,79,1)'
        }
        if (i == data.length-1){
            // initialize to midnight on the first day
            currentDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));
        } else {
            currentDateTime = new Date(data[i][0]);    //do I need the Date?
        }
        if (i == 0){
            nextDateTime = now;
        } else {
            nextDateTime = new Date(data[i-1][0]);
        }
        plot_data.push({
            x: [(nextDateTime - currentDateTime)/(60*1000)],
            y: [''],
            name: data[i][1],
            orientation: 'h',
            marker: {
                color: color,
                width: 1
            },
            type: 'bar'
        });
    }
    // console.log(plot_data);

    // // for 1 hour view
    // var tickvals = [...Array(12).keys()].map(function(x) { return x * 5; });
    // var firstDateTime = new Date(data[0][0]);
    // var ticktext = tickvals.map(function(x) { return new Date( firstDateTime.getTime() + x*60*1000 ); });
    // ticktext = ticktext.map(function(x) {return x.getMonth() + '/' + x.getDate() + ' ' + x.getHours() + ':' + x.getMinutes()});

    /*
    set tick interals, for 1 day make them every hour
                       for 2 days make them every other hour ...
    */
    var tickvals = [...Array(24).keys()].map(function(x) { return x * 60 * days; });
    var ticktext = tickvals.map(function(x) { return new Date( firstDateTime.getTime() + x*60*1000 ); });
    // ticktext = ticktext.map(function(x) {return x.getMonth() + '/' + x.getDate() + ' ' + x.getHours() + ':' + x.getMinutes()});
    ticktext = ticktext.map(function(x) {return x.getHours() + ':' + ('0'+x.getMinutes()).slice(-2)});
    ticktext[0] = (firstDateTime.getMonth()+1) + '/' + firstDateTime.getDate() + ' ' +  ticktext[0]

    var layout = {
        // title: {
        //     text: "Equipment State",
        //     font: {
        //         color: 'white'
        //     }
        // },
        margin: {
            b: 'auto',
            l: 20,
            r: 20,
            t: 5
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        barmode: 'stack',
        showlegend: false,
        xaxis: {
            // range: ['2016-07-01', '2016-12-31'],
            tickvals: tickvals,
            ticktext: ticktext,
            tickangle: 45,
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            showgrid: false
        },
        yaxis: {
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            // mirror: true
        }
    };

    var config = {responsive: true};
    Plotly.react(document.getElementById(elementId), plot_data, layout, config);
}


async function generateStateUtilizationPlot(elementId1, elementId2, assetId, dataItemId, days){
    // also tracks utilizatino
    var utilization = 0;

    var url_base = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?";
    url_base += "assetId=" + assetId; 
    url_base += "&dataItemId=" + dataItemId;
    // get state from midnight
    var now = new Date();
    var firstDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));
    url = url_base + "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+"T00:00&limit=5000";
    // get the last state before current day
    url2 = url_base + "&endDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+"T00:00&limit=1";
    console.log(url)

    // add the most recent state (before today) to today's state changes
    var previousState = await getDataString(url2, 'value');
    var data = await getDataString(url, 'value');
    // data.push(previousState[0])
    if (data.length == 0) {
        // no states in the last 48 hours
        data = previousState;
    } else if (previousState.length != 0) {
        // everything is good, add previous state to current state
        data.push(previousState[0])
    }

    var url_alarms = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?"
    url_alarms += "assetId=" + assetId;
    url_alarms += "&dataItemId=EquipmentAlarm"
    url_alarms += "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+
                    "T"+firstDateTime.getHours()+":"+firstDateTime.getMinutes()+"&limit=5000";
    var alarms = await getDataString(url_alarms, 'value');

    // just for testing
    var data = await getDataStringTest1("", 'value');
    var alarms = await getDataStringTest2("", 'value');
    
    // combine alarms and data and sort by timestamp
    data = data.concat(alarms)
    data.sort(function(x, y){
        return y[0] - x[0];
    })


    // create plot data
    var plot_data = [];
    var currentDateTime, nextDateTime;
    var prevColor = 'rgba(84,88,90,1)';   // gray
    for (var i=data.length-1; i>=0; i--) {
        if (i == data.length-1){
            // initialize to midnight on the first day
            currentDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));
        } else {
            currentDateTime = new Date(data[i][0]);    //do I need the Date?
        }
        if (i == 0){
            nextDateTime = now;
        } else {
            nextDateTime = new Date(data[i-1][0]);
        }

        var color = 'rgba(84,88,90,1)';   // gray
        if (data[i][1] == '"Active"' || data[i][1] == '"ACTIVE"') {
            color = 'rgba(50,160,109,1)'; // green
            utilization += (nextDateTime - currentDateTime)/(60*1000);
        } else if (data[i][1] == '"True"' || data[i][1] == '"TRUE"') {
            // alarm, unique case
            plot_data.push({
                x: [2],
                y: [''],
                name: 'Fault',
                orientation: 'h',
                marker: {
                    color: 'red',
                    width: 1
                },
                type: 'bar'
            });
            plot_data.push({
                x: [(nextDateTime - currentDateTime)/(60*1000)-2],
                y: [''],
                name: data[i+1][1],
                orientation: 'h',
                marker: {
                    color: prevColor,
                    width: 1
                },
                type: 'bar'
            });
            if (prevColor == 'rgba(50,160,109,1)') {
                utilization += (nextDateTime - currentDateTime)/(60*1000);
            } 
            break;
        }

        plot_data.push({
            x: [(nextDateTime - currentDateTime)/(60*1000)],
            y: [''],
            name: data[i][1],
            orientation: 'h',
            marker: {
                color: color,
                width: 1
            },
            type: 'bar'
        });
        prevColor = color;
    }

    /*
    set tick interals, for 1 day make them every hour
                       for 2 days make them every other hour ...
    */
    var tickvals = [...Array(24).keys()].map(function(x) { return x * 60 * days; });
    var ticktext = tickvals.map(function(x) { return new Date( firstDateTime.getTime() + x*60*1000 ); });
    // ticktext = ticktext.map(function(x) {return x.getMonth() + '/' + x.getDate() + ' ' + x.getHours() + ':' + x.getMinutes()});
    ticktext = ticktext.map(function(x) {return x.getHours() + ':' + ('0'+x.getMinutes()).slice(-2)});
    ticktext[0] = (firstDateTime.getMonth()+1) + '/' + firstDateTime.getDate() + ' ' +  ticktext[0]

    var layout = {
        // title: {
        //     text: "Equipment State",
        //     font: {
        //         color: 'white'
        //     }
        // },
        margin: {
            b: 'auto',
            l: 20,
            r: 20,
            t: 5
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        barmode: 'stack',
        showlegend: false,
        xaxis: {
            // range: ['2016-07-01', '2016-12-31'],
            tickvals: tickvals,
            ticktext: ticktext,
            tickangle: 45,
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            showgrid: false
        },
        yaxis: {
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            // mirror: true
        }
    };

    var config = {responsive: true};
    Plotly.react(document.getElementById(elementId1), plot_data, layout, config);

    // utilization
    // var percentage = utilization / (days*24*60); // units are minutes
    // document.getElementById(elementId2).innerHTML = String(Math.round(percentage*100)) + '%';
}


async function generateFaultCount(dataItemId, elementId, assetId, days=1) { //
    // startTime, endTime are global variables 
    var url = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?";
    url += "assetId=" + assetId; 
    url += "&dataItemId=" + dataItemId;
    var now = new Date();
    var firstDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));

    url += "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+
                    "T"+firstDateTime.getHours()+":"+firstDateTime.getMinutes()+"&limit=5000";
    var data = await getDataString(url, 'value');
    // for testing only
    var data = await getDataStringTest2("", 'value');

    document.getElementById(elementId).innerHTML = String(data.length);
}


async function generateUtilizationPlot(elementId, assetId, dataItemId){
    // plot utilization over the last 7 days
    var utilization = [0,0,0,0,0,0,0];
    var url_base = "https://uu93rouaad.execute-api.us-east-1.amazonaws.com/v1/iotchallenge/messages?";
    url_base += "assetId=" + assetId; 
    url_base += "&dataItemId=" + dataItemId;

    var now = new Date();
    var url;
    var firstDateTime, secondDateTime;
    for (var day = 0; day<7; day++) {
        firstDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-day-1));    // previous day
        if (day==0) {
            secondDateTime = now;
        } else {
            secondDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-day)); // day of interest
        }
        // get all the state changes on the day of interest
        url = url_base + "&startDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+"T00:00&limit=5000";
        url += "&endDateTime="+secondDateTime.getFullYear()+"-"+(secondDateTime.getMonth()+1)+"-"+secondDateTime.getDate()+"T00:00&limit=5000";
        // get the last state before current day
        url2 = url_base + "&endDateTime="+firstDateTime.getFullYear()+"-"+(firstDateTime.getMonth()+1)+"-"+firstDateTime.getDate()+"T00:00&limit=1";
        // console.log(url);
        
        // add the most recent state (before today) to today's state changes
        var previousState = await getDataString(url2, 'value');
        var data = await getDataString(url, 'value');
        if (data.length == 0) {
            // no states in the day
            data = previousState;
        } else if (previousState.length != 0) {
            // everything is good, add previous state to current state
            data.push(previousState[0])
        }
    
        for (var i=data.length-1; i>=0; i--) {
            if (i == data.length-1){
                // initialize to midnight on the first day
                currentDateTime = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(day-1)));
            } else {
                currentDateTime = new Date(data[i][0]);    //do I need the Date?
            }
            if (i == 0){
                nextDateTime = now;
            } else {
                nextDateTime = new Date(data[i-1][0]);
            }
    
            if (data[i][1] == '"Active"' || data[i][1] == '"ACTIVE"') {
                utilization[day] += (nextDateTime - currentDateTime)/(60*1000);
            } 
        }
    }
    console.log(utilization);

    // for testing 
    utilization = [0, 0, 0.3, 0.8, 0.5, 0.4, 0.6];

    // set tick interals
    var baseDate = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-6));
    var labels = [];
    for (i=0; i<7; i++) {
        labels.push(baseDate.toLocaleDateString(undefined, { weekday: 'long' }));
        baseDate.setDate(baseDate.getDate() + 1);    
    }
    console.log(labels);

    var plot_data = [
        {
            x: labels,
            y: utilization,
            type: 'bar',
            marker: {
                color: '#B3A369'
            }
        }
    ]

    var layout = {
        // title: {
        //     text: "Equipment State",
        //     font: {
        //         color: 'white'
        //     }
        // },
        margin: {
            b: 'auto',
            l: 50,
            r: 20,
            t: 5
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        showlegend: false,
        xaxis: {
            tickangle: 45,
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            showgrid: false
        },
        yaxis: {
            range: [0,1],
            color: 'white',
            linecolor: 'white',
            linewidth: 1,
            // mirror: true
        }
    };

    var config = {responsive: true};
    Plotly.react(document.getElementById(elementId), plot_data, layout, config);
}