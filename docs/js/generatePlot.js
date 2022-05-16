// Created by Nathaniel DeVol

async function generateMachinePlots(elementId1, elementId2, elementId3, assetId, dataItemId, days){
    if (assetId == "BooJi_1" || assetId == "BooJi_2") {
        // also tracks utilization and number of alarms
        var utilization = 0;  // elementId2
        var num_alarms = 0;   // elementId3

        var now = new Date(2022, 4, 13, 13, 00);
        var firstDateTime = new Date(2022, 4, 13-days+1, 00, 00);

        if (assetId == "BooJi_1") {
            var data_full = await getTestStates1("", 'value');
        } else if (assetId == "BooJi_2") {
            var data_full = await getTestStates2("", 'value');
        } 

        // combine alarms and data and sort by timestamp
        if (assetId == "BooJi_1") {
            var alarms = await getTestAlarms1("", 'value');
            data_full = data_full.concat(alarms)
            data_full.sort(function(x, y){
                return y[0] - x[0];
            })
        }

        var data = data_full.filter(row => row[0] > firstDateTime);
        // add the most recent state (before today) to today's state changes
        data.push(data_full[data.length]);

        // create plot data
        var plot_data = [];
        var currentDateTime, nextDateTime;
        var prevColor = 'rgba(84,88,90,1)';   // gray
        for (var i=data.length-1; i>=0; i--) {
            if (i == data.length-1){
                // initialize to midnight on the first day
                currentDateTime = firstDateTime; //new Date(now.getFullYear(), now.getMonth(), (now.getDate()-(days-1)));
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
                num_alarms++;
                plot_data.push({
                    x: [days*2],
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
                continue;
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
        var percentage = utilization / ((now-firstDateTime)/(60*1000)); // units are minutes
        document.getElementById(elementId2).innerHTML = String(Math.round(percentage*100)) + '%';

        // number of alarms
        if (assetId == "BooJi_1") {
            document.getElementById(elementId3).innerHTML = num_alarms;
        } else {
            document.getElementById(elementId3).innerHTML = "Model is training. Fault count will become available once training is complete.";
            document.getElementById(elementId3).style.fontSize = 'large';
        } 
    } else {
        document.getElementById(elementId1).innerHTML = "Application is initializing. Plots will begin to populate once the threshold for machine state is set."
        document.getElementById(elementId1).style.fontSize = 'large';
        document.getElementById(elementId1).style.color = 'white';
        document.getElementById(elementId1).style.paddingTop = '50px';
    }
    
}


async function generateUtilizationPlot(elementId, assetId, dataItemId){
    // plot utilization over the last 7 days
    var utilization = [0,0,0,0,0,0,0];
    
    var now = new Date(2022, 4, 13, 13, 00);

    // starting with all states for demo
    if (assetId == "BooJi_1") {
        var data_full = await getTestStates1("", 'value');
    } else if (assetId == "BooJi_2") {
        var data_full = await getTestStates2("", 'value');
    } 

    var firstDateTime, secondDateTime;
    for (var day = 0; day<7; day++) {
        firstDateTime = new Date(2022, 4, 13-day, 0, 1);    // previous day
        if (day == 0) {
            secondDateTime = now;
        } else {
            secondDateTime = new Date(2022, 4, 13-day, 23, 59); // day of interest
        }
        
        var data = data_full.filter(row => row[0] > firstDateTime);
        // add the most recent state (before day of interest) to today's state changes
        data.push(data_full[data.length]);
        // now get rid of the data from before the day of interest
        data = data.filter(row => row[0] < secondDateTime);

        for (var i=data.length-1; i>=0; i--) {
            if (i == data.length-1){
                // initialize to midnight on the first day
                currentDateTime = firstDateTime;
            } else {
                currentDateTime = new Date(data[i][0]);    //do I need the Date?
            }
            if (i == 0){
                nextDateTime = secondDateTime;
            } else {
                nextDateTime = new Date(data[i-1][0]);
            }
            if (data[i][1] == '"Active"' || data[i][1] == '"ACTIVE"') {
                utilization[day] += (nextDateTime - currentDateTime)/(60*1000);
            } 
        }
        // convert to percentage 
        utilization[day] /= ((secondDateTime-firstDateTime)/(60*1000));
    }

    // for testing 
    // utilization = [0, 0, 0.3, 0.8, 0.5, 0.4, 0.6];

    // set tick interals
    // var baseDate = new Date(now.getFullYear(), now.getMonth(), (now.getDate()-6));
    var baseDate = new Date(now.getFullYear(), now.getMonth(), (now.getDate()));
    var labels = [];
    for (i=0; i<7; i++) {
        labels.push(baseDate.toLocaleDateString(undefined, { weekday: 'long' }));
        baseDate.setDate(baseDate.getDate() + 1);    
    }

    var plot_data = [
        {
            x: labels.reverse(),
            y: utilization.reverse(),
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