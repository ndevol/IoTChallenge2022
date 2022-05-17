// Created by Nathaniel DeVol

async function getTestStates1(messagesUrl, key) {
    arr = [
        {
        "dateTime": "2022-05-13T14:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-13T11:40:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-13T04:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-12T23:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-12T21:00:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-12T18:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-12T16:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-12T10:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-12T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-10T10:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-10T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-08T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-08T01:40:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-07T23:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-07T12:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-07T02:00:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-06T18:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-06T15:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-05T18:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-05T08:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-04T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-03-08T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        }
        ]

    var data_parsed = [];
    for(var i = 0; i < arr.length; i++) {
        data_parsed.push([new Date(arr[i].dateTime), arr[i][key]]);
    }
    return data_parsed
}

async function getTestAlarms1(messagesUrl, key) {
    arr = [
        {
        "dateTime": "2022-05-13T14:40:00.000Z", // "2022-05-13T14:40:00.000Z" or "2022-05-12T09:50:00.000Z"
        "dataItemId": "EquipmentAlarm",
        "value": "\"True\""
        },       
        {
        "dateTime": "2022-05-10T10:40:00.000Z",
        "dataItemId": "EquipmentAlarm",
        "value": "\"True\""
        },
        {
        "dateTime": "2022-05-10T10:20:00.000Z",
        "dataItemId": "EquipmentAlarm",
        "value": "\"True\""
        }
    ]

    var data_parsed = [];
    for(var i = 0; i < arr.length; i++) {
        data_parsed.push([new Date(arr[i].dateTime), arr[i][key]]);
    }
    return data_parsed
}

async function getTestStates2(messagesUrl, key) {
    arr = [
        {
        "dateTime": "2022-05-13T11:40:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-12T18:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-12T10:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-11T15:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-11T10:30:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-09T23:23:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-09T20:30:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-05-08T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "dateTime": "2022-05-07T23:30:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "dateTime": "2022-03-08T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        }
        ]

    var data_parsed = [];
    for(var i = 0; i < arr.length; i++) {
        data_parsed.push([new Date(arr[i].dateTime), arr[i][key]]);
    }
    return data_parsed
}
