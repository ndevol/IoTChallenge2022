// Created by Nathaniel DeVol

async function getData(messagesUrl, key) {
    const data = await httpGetAsync(messagesUrl);
    
    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        // data_parsed.push([new Date(arr[i].dateTime), Number(arr[i][key])]);
        data_parsed.push([new Date(arr[i].dateTime), Number(JSON.parse(arr[i][key]))]);
    }
    return data_parsed
}


async function getDataString(messagesUrl, key) {
    const data = await httpGetAsync(messagesUrl);

    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        data_parsed.push([new Date(arr[i].dateTime), arr[i][key]]);
    }
    return data_parsed
}


async function getDataPayload(messagesUrl, key) {
    const data = await httpGetAsync(messagesUrl);

    var data_parsed = [];
    // parse data
    var arr = JSON.parse(data);
    for(var i = 0; i < arr.length; i++) {
        payload = JSON.parse(arr[i].payload)
        data_parsed.push([new Date(payload.dateTime), Number(payload[key])]);
    }
    return data_parsed
}

async function getDataStringTest1(messagesUrl, key) {
    arr = [
        {
        "Id": 2650109,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:51:25.726Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Stopped\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-13T15:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "Id": 2650097,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:51:15.580Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Active\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-13T11:40:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "Id": 2649554,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:41:40.371Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Stopped\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-13T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "Id": 2599374,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:06:04.513Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Active\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-12T23:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "Id": 2599373,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:06:09.545Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Stopped\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-12T21:00:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "Id": 2599372,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:06:19.643Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Stopped\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-12T18:10:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "Id": 2599369,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T22:06:15.726Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Active\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-12T16:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "Id": 2582424,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T21:57:49.346Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Stopped\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-12T10:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Stopped\""
        },
        {
        "Id": 2582306,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T21:57:44.317Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Active\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-12T05:50:00.000Z",
        "dataItemId": "EquipmentChangeState",
        "value": "\"Active\""
        },
        {
        "Id": 2582306,
        "messageId": null,
        "topic": "Asset/Demo_BBB/EquipmentChangeState",
        "payload": "{\"assetId\":\"Demo_BBB\",\"dateTime\":\"2022-04-14T21:57:44.317Z\",\"dataItemId\":\"EquipmentChangeState\",\"value\":\"Active\"}",
        "assetId": "Demo_BBB",
        "dateTime": "2022-05-08T05:50:00.000Z",
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

async function getDataStringTest2(messagesUrl, key) {
    arr = [
        {
            "assetId": "Demo_BBB",
            "dateTime": "2022-05-13T14:40:00.000Z",
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