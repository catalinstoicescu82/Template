let configuration;
let roomNumbers;
let roomNames = [];
let roomNamesToSend;
let deviceNumbers;
let deviceNames = [];
let deviceNamesToSend;

function load() {

    $.getJSON("assets/data/Configure.json", function(json) {
        configuration = json;
        loadRooms(configuration);
    });

}


function loadRooms(configuration) {
    roomNumbers = configuration.Rooms.length;
    configuration.Rooms.forEach(element => {

        roomNames.push(element.RoomName);
    });
    roomNamesToSend = '[{"label":"' + roomNames.join('"},{"label":"') + '"}]';
    CrComLib.publishEvent("n", "zonesSize", 20);
    CrComLib.publishEvent("n", "zonesSize", roomNumbers);
    CrComLib.publishEvent("s", "zonesVars", roomNamesToSend);
    for (let i = 0; i < roomNumbers; i++) {
        CrComLib.publishEvent("s", `zone[${i}].Icon`, `assets/images/icons/zone-icon${configuration.Rooms[i].RoomIcon}-i.png`);

    }


    deviceNames.push(configuration.Rooms[0].Lights.Name);
    deviceNames.push(configuration.Rooms[0].Blinds.Name);
    deviceNames.push(configuration.Rooms[0].HVAC.Name);
    configuration.Rooms[0].Sources.forEach(element => {
        deviceNames.push(element.Name);
    });
    deviceNamesToSend = '[{"label":"' + deviceNames.join('"},{"label":"') + '"}]';
    CrComLib.publishEvent("n", "devicesSize", 20);
    CrComLib.publishEvent("n", "devicesSize", deviceNames.length);
    CrComLib.publishEvent("s", "devicesVars", deviceNamesToSend);
    CrComLib.publishEvent("s", `device[0].Icon`, `assets/images/icons/device-icon${configuration.Rooms[0].Lights.Icon}-i.png`);
    CrComLib.publishEvent("s", `device[1].Icon`, `assets/images/icons/device-icon${configuration.Rooms[0].Blinds.Icon}-i.png`);
    CrComLib.publishEvent("s", `device[2].Icon`, `assets/images/icons/device-icon${configuration.Rooms[0].HVAC.Icon}-i.png`);

    for (let i = 0; i < configuration.Rooms[0].Sources.length; i++) {
        CrComLib.publishEvent("s", `device[${i+3}].Icon`, `assets/images/icons/device-icon${configuration.Rooms[0].Sources[i].Icon}-i.png`);
    }
    subscribeToZones("zone", roomNumbers);
}




function subscribeToZones(list, number) {
    for (let i = 0; i < number; i++) {
        CrComLib.subscribeState("b", `${list}[${i}].Select`, function(value) {
            if (value === true) {
                for (let index = 0; index < number; index++) {
                    CrComLib.publishEvent("b", `${list}[${index}].Selected`, false);
                }
                CrComLib.publishEvent("b", `${list}[${i}].Selected`, true);
                CrComLib.publishEvent("s", "roomName", configuration.Rooms[i].RoomName);
                loadDevices(i);
            }
        });
    }

}

function loadDevices(roomNumber) {
    if (configuration.Rooms[roomNumber].Lights.Available === 1) { CrComLib.publishEvent("b", `device[0].Visible`, true); } else { CrComLib.publishEvent("b", `device[0].Visible`, false); }
    if (configuration.Rooms[roomNumber].Blinds.Available === 1) { CrComLib.publishEvent("b", `device[1].Visible`, true); } else { CrComLib.publishEvent("b", `device[1].Visible`, false); }
    if (configuration.Rooms[roomNumber].HVAC.Available === 1) { CrComLib.publishEvent("b", `device[2].Visible`, true); } else { CrComLib.publishEvent("b", `device[2].Visible`, false); }
    for (let i = 0; i < configuration.Rooms[roomNumber].Sources.length; i++) {
        if (configuration.Rooms[roomNumber].Sources[i].Available === 1) { CrComLib.publishEvent("b", `device[${i+3}].Visible`, true); } else { CrComLib.publishEvent("b", `device[${i+3}].Visible`, false); }

    }
    subscribeToDevices("device", deviceNames.length)

}

function subscribeToDevices(list, number) {
    for (let i = 0; i < number; i++) {
        CrComLib.subscribeState("b", `${list}[${i}].Select`, function(value) {
            if (value === true) {
                for (let index = 0; index < number; index++) {
                    CrComLib.publishEvent("b", `${list}[${index}].Selected`, false);
                }
                CrComLib.publishEvent("b", `${list}[${i}].Selected`, true);
                if (i === 0) {
                    CrComLib.publishEvent("s", "sourceName", configuration.Rooms[0].Lights.Name);
                } else if (i === 1) {
                    CrComLib.publishEvent("s", "sourceName", configuration.Rooms[0].Blinds.Name);
                } else if (i === 2) {
                    CrComLib.publishEvent("s", "sourceName", configuration.Rooms[0].HVAC.Name);
                } else {
                    CrComLib.publishEvent("s", "sourceName", configuration.Rooms[0].Sources[i - 3].Name);
                }
            }
        });
    }

}
//CrComLib.publishEvent("b", `${list}[${i}].Selected`, true);