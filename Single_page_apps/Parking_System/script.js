
var totalSlots = 5;
var parking = [];
var vehicles = [];

// Create 5 empty parking slots
for (var i = 1; i <= totalSlots; i++) {
    parking.push({
        slotNumber: i,
        vehicleNumber: "",
        vehicleType: ""
    });
}

// Display parking slots and vehicle list
function displayParking() {
    var area = document.getElementById("parkingArea");
    var list = document.getElementById("vehicleList");

    area.innerHTML = "";
    list.innerHTML = "";

    var available = 0;
    var occupied = 0;

    // Display every parking slot
    for (var i = 0; i < parking.length; i++) {
        var slot = document.createElement("div");

        if (parking[i].vehicleNumber == "") {
            slot.className = "slot available";
            slot.innerHTML = "Slot P" + parking[i].slotNumber
                           + "<br>Available";
            available++;
        } else {
            slot.className = "slot occupied";
            slot.innerHTML = "Slot P" + parking[i].slotNumber
                           + "<br>" + parking[i].vehicleNumber;
            occupied++;
        }

        area.appendChild(slot);
    }

    // Display vehicle list
    for (var i = 0; i < vehicles.length; i++) {
        var item = document.createElement("div");

        item.className = "vehicle";
        item.innerHTML = "Vehicle: " + vehicles[i].vehicleNumber
                       + " | Type: " + vehicles[i].vehicleType
                       + " | Slot: P" + vehicles[i].slotNumber;

        list.appendChild(item);
    }

    document.getElementById("totalSlots").innerHTML = totalSlots;
    document.getElementById("availableSlots").innerHTML = available;
    document.getElementById("occupiedSlots").innerHTML = occupied;
}

// Park a vehicle
function parkVehicle() {
    var number = document.getElementById("vehicleNumber").value;
    var type = document.getElementById("vehicleType").value;
    var message = document.getElementById("parkMessage");

    number = number.trim().toUpperCase();

    // Check empty vehicle number
    if (number == "") {
        message.innerHTML = "INVALID VEHICLE";
        return;
    }

    // Check whether vehicle is already parked
    for (var i = 0; i < vehicles.length; i++) {
        if (vehicles[i].vehicleNumber == number) {
            message.innerHTML = "VEHICLE ALREADY PARKED";
            return;
        }
    }

    // Find the first available slot
    var found = false;

    for (var i = 0; i < parking.length; i++) {
        if (parking[i].vehicleNumber == "") {

            parking[i].vehicleNumber = number;
            parking[i].vehicleType = type;

            // Add vehicle details
            vehicles.push({
                vehicleNumber: number,
                vehicleType: type,
                slotNumber: parking[i].slotNumber
            });

            message.innerHTML = "Vehicle parked in slot P"
                              + parking[i].slotNumber;

            found = true;
            break;
        }
    }

    // If there is no empty slot
    if (found == false) {
        message.innerHTML = "PARKING FULL";
    }

    document.getElementById("vehicleNumber").value = "";

    displayParking();
}

// Remove a vehicle
function removeVehicle() {
    var number = document.getElementById("removeNumber").value;
    var message = document.getElementById("removeMessage");

    number = number.trim().toUpperCase();

    if (number == "") {
        message.innerHTML = "INVALID VEHICLE";
        return;
    }

    var found = false;

    // Search for the vehicle
    for (var i = 0; i < vehicles.length; i++) {
        if (vehicles[i].vehicleNumber == number) {

            var slotNumber = vehicles[i].slotNumber;

            // Make the parking slot empty again
            for (var j = 0; j < parking.length; j++) {
                if (parking[j].slotNumber == slotNumber) {
                    parking[j].vehicleNumber = "";
                    parking[j].vehicleType = "";
                }
            }

            // Remove vehicle from the list
            vehicles.splice(i, 1);

            message.innerHTML = "Vehicle removed from slot P"
                              + slotNumber;

            found = true;
            break;
        }
    }

    // Vehicle was not found
    if (found == false) {
        message.innerHTML = "VEHICLE NOT FOUND";
    }

    document.getElementById("removeNumber").value = "";

    displayParking();
}

// Show initial parking slots
displayParking();
