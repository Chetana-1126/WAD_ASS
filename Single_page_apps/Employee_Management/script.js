let employees = [];
let shifts = [];
let assign = [];

document.getElementById("employeeForm").onsubmit = function(event) {
    event.preventDefault();

    let ID = document.getElementById("employeeId").value;
    let Name = document.getElementById("employeeName").value;

    employees.push({ID, Name});

    let li = document.createElement("li");
    li.textContent = Name + " - " + ID;

    document.getElementById("employeeList").appendChild(li);

    let option = document.createElement("option");
    option.value = ID;
    option.textContent = Name;

    document.getElementById("employeeSelect").appendChild(option);

    this.reset();
};

document.getElementById("addShift").onclick = function(){
    let date = document.getElementById("shiftDate").value;
    let start = document.getElementById("startTime").value;
    let end = document.getElementById("endTime").value;

    if(date == "" || start == "" || end == "" || start >= end){
        alert("please fill the all fields");
        return;
    }
    shifts.push({date, start, end});

    let p = document.createElement("p");
    p.textContent = date + ":" + start + "-" + end;

    document.getElementById("shiftList").appendChild(p);

    let option = document.createElement("option");
    option.value = shifts.length - 1;
    option.textContent = date + ":" + start + "-" + end;

    document.getElementById("selectShift").appendChild(option)
};

document.getElementById("assignShift").onclick = function() {

    let id = document.getElementById("employeeSelect").value;
    let i = document.getElementById("selectShift").value;

    if (id == "" || i == "") {
        alert("Select employee and shift!");
        return;
    }

    let s = shifts[i];

    for (let a of assign) {
        let old = shifts[a.shift];

        if (a.id == id && old.date == s.date &&
            s.start < old.end && s.end > old.start) {
            alert("Shift conflict!");
            return;
        }
    }

    assign.push({id: id, shift: i});

    let p = document.createElement("p");
    p.textContent = id + " - " + s.date + " " + s.start + "-" + s.end;

    document.getElementById("assignmentList").appendChild(p);
};
