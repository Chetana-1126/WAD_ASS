let seats = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];

let bookings = [];
let id = 1;

function displaySeats() {
    let layout = document.getElementById("seatLayout");
    layout.innerHTML = "";

    let free = 0;

    for (let i = 0; i < 15; i++) {

        let name = "";

        if (i < 5) {
            name = "A" + (i + 1);
        } else if (i < 10) {
            name = "B" + (i - 4);
        } else {
            name = "C" + (i - 9);
        }

        let seat = document.createElement("span");
        seat.textContent = name;
        seat.className = "seat";

        if (seats[i] == 0) {
            free++;
        } else {
            seat.classList.add("booked");
        }

        layout.appendChild(seat);

        if (i == 4 || i == 9) {
            layout.appendChild(document.createElement("br"));
        }
    }

    document.getElementById("freeSeats").textContent = free;

    // Display bookings
    let list = document.getElementById("bookingList");
    list.innerHTML = "";

    for (let b of bookings) {
        let p = document.createElement("p");
        p.textContent = "Booking " + b.id + ": " + b.seats;
        list.appendChild(p);
    }
}

document.getElementById("bookBtn").onclick = function() {

    let count = Number(document.getElementById("seatCount").value);
    let message = document.getElementById("bookMessage");

    if (count < 1 || count > 15 ||
        count != Math.floor(count) ||
        document.getElementById("seatCount").value == "") {

        message.textContent = "INVALID COUNT";
        return;
    }

    // Check Row A, then B, then C
    for (let row = 0; row < 3; row++) {

        // Check possible starting positions
        for (let col = 0; col <= 5 - count; col++) {

            let free = true;

            // Check every seat in this group
            for (let k = col; k < col + count; k++) {

                let position = row * 5 + k;

                if (seats[position] != 0) {
                    free = false;
                }
            }

            if (free == true) {

                let bookedSeats = "";

                for (let k = col; k < col + count; k++) {

                    let position = row * 5 + k;
                    seats[position] = id;

                    let name = "";

                    if (row == 0) {
                        name = "A";
                    } else if (row == 1) {
                        name = "B";
                    } else {
                        name = "C";
                    }

                    bookedSeats = bookedSeats + name + (k + 1) + " ";
                }

                bookings.push({
                    id: id,
                    seats: bookedSeats
                });

                message.textContent = "BOOKED " + id + ": " + bookedSeats;

                id++;

                displaySeats();
                return;
            }
        }
    }

    message.textContent = "NO SEATS TOGETHER";
};

document.getElementById("cancelBtn").onclick = function() {

    let number = Number(document.getElementById("bookingNo").value);
    let message = document.getElementById("cancelMessage");

    if (document.getElementById("bookingNo").value == "" ||
        number < 1 || number != Math.floor(number)) {

        message.textContent = "INVALID BOOKING";
        return;
    }

    for (let b of bookings) {

        if (b.id == number) {

            // Free the seats
            for (let i = 0; i < 15; i++) {

                if (seats[i] == number) {
                    seats[i] = 0;
                }
            }

            message.textContent = "CANCELLED " + number + ": " + b.seats;

            // Remove booking
            bookings = bookings.filter(function(item) {
                return item.id != number;
            });

            displaySeats();
            return;
        }
    }

    message.textContent = "BOOKING NOT FOUND";
};

displaySeats();

/*let seats = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];

let bookings = [];
let bookingId = 1;

// Display seats and booking list
function displaySeats() {
    let layout = document.getElementById("seatLayout");
    layout.innerHTML = "";

    let available = 0;

    for (let i = 0; i < 15; i++) {
        let name = "";

        if (i < 5) {
            name = "A" + (i + 1);
        } else if (i < 10) {
            name = "B" + (i - 4);
        } else {
            name = "C" + (i - 9);
        }

        let seat = document.createElement("span");
        seat.textContent = name;
        seat.className = "seat";

        if (seats[i] != 0) {
            seat.classList.add("booked");
        } else {
            available++;
        }

        layout.appendChild(seat);

        if (i == 4 || i == 9) {
            layout.appendChild(document.createElement("br"));
        }
    }

    document.getElementById("freeSeats").textContent = available;

    // Display booking list
    let list = document.getElementById("bookingList");
    list.innerHTML = "";

    for (let b of bookings) {
        let p = document.createElement("p");
        p.textContent = "Booking " + b.id + ": " + b.seats;
        list.appendChild(p);
    }
}

// Book seats
document.getElementById("bookBtn").onclick = function() {
    let count = Number(document.getElementById("seatCount").value);
    let message = document.getElementById("bookMessage");

    if (document.getElementById("seatCount").value == "" ||
        count < 1 || count > 15 ||
        count != Math.floor(count)) {

        message.textContent = "INVALID COUNT";
        return;
    }

    // Check each row
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col <= 5 - count; col++) {
            let free = true;

            // Check consecutive seats
            for (let k = col; k < col + count; k++) {
                let position = row * 5 + k;

                if (seats[position] != 0) {
                    free = false;
                }
            }

            // Book seats if available
            if (free == true) {
                let bookedSeats = "";

                for (let k = col; k < col + count; k++) {
                    let position = row * 5 + k;
                    seats[position] = bookingId;

                    let name = "";

                    if (row == 0) {
                        name = "A";
                    } else if (row == 1) {
                        name = "B";
                    } else {
                        name = "C";
                    }

                    bookedSeats += name + (k + 1) + " ";
                }

                bookings.push({
                    id: bookingId,
                    seats: bookedSeats
                });

                message.textContent =
                    "BOOKED " + bookingId + ": " + bookedSeats;

                bookingId++;
                displaySeats();
                return;
            }
        }
    }

    message.textContent = "NO SEATS TOGETHER";
};

// Cancel booking
document.getElementById("cancelBtn").onclick = function() {
    let number = Number(document.getElementById("bookingNo").value);
    let message = document.getElementById("cancelMessage");

    if (document.getElementById("bookingNo").value == "" ||
        number < 1 || number != Math.floor(number)) {

        message.textContent = "INVALID BOOKING";
        return;
    }

    // Find booking
    for (let b of bookings) {
        if (b.id == number) {

            // Free the seats
            for (let i = 0; i < 15; i++) {
                if (seats[i] == number) {
                    seats[i] = 0;
                }
            }

            message.textContent =
                "CANCELLED " + number + ": " + b.seats;

            // Remove booking
            bookings = bookings.filter(function(item) {
                return item.id != number;
            });

            displaySeats();
            return;
        }
    }

    message.textContent = "BOOKING NOT FOUND";
};

// Display initial layout
displaySeats();*/
