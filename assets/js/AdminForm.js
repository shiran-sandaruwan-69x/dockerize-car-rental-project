//Button Click

let btnarray = ['#btn-home', '#btn-customers', '#btn-cars', '#btn-orders', '#btn-payments', '#btn-reports', '#btn-drivers'];

loadAllCustomers();
loadAllUnverifiedCustomers();
loadAllDrivers();

function setClass() {
    for (id in btnarray) {
        $(btnarray[id]).removeClass('btn-custom-selected').addClass('btn-custom');
    }
}

$('#btn-home').click(() => {
    hideall();
    setClass();
    $('#btn-home').addClass('btn-custom-selected');
    $('#Dashboard').fadeIn(1000);

});

$('#btn-customers').click(() => {
    hideall();
    setClass();
    loadAllUnverifiedCustomers();
    loadAllCustomers();
    $('#btn-customers').addClass('btn-custom-selected');
    $('#Customers').fadeIn(1000);

});

$('#btn-cars').click(() => {
    hideall();
    setClass();
    loadAllCars();
    $('#btn-cars').addClass('btn-custom-selected');
    $('#Cars').fadeIn(1000);
});

$('#btn-orders').click(() => {
    hideall();
    setClass();
    loadAllOrders();
    $('#btn-orders').addClass('btn-custom-selected');
    $('#Orders').fadeIn(1000);
});

$('#btn-payments').click(() => {
    hideall();
    setClass();
    $('#btn-payments').addClass('btn-custom-selected');
    $('#Payments').fadeIn(1000);
});

$('#btn-reports').click(() => {
    hideall();
    setClass();
    $('#btn-reports').addClass('btn-custom-selected');

});

$('#btn-drivers').click(() => {
    hideall();
    setClass();
    loadAllDrivers();
    $('#btn-drivers').addClass('btn-custom-selected');
    $('#Drivers').fadeIn(1000);

});

$('#cleardriver').click(() => {
    cleardriverfields();
});

let hide = ['#Dashboard', '#Customers', '#Cars', '#Drivers', '#Orders','#Payments'];

function hideall() {
    for (let i in hide) {
        $(hide[i]).hide();
    }

}

//===============customers========================

function checkvalidation() {

    let name = $('#inputName').val();
    let contact = $('#inputContactNo').val();
    let email = $('#inputEmail').val();
    let address = $('#inputAddress').val();
    let drivingLicenceNo = $('#inputDrivingLicence').val();
    let nic = $('#inputNIC').val();
    let userName = $('#inputUserName').val();
    let password = $('#inputPassword').val();

    if (name != "") {
        if (contact != "") {
            if (email != "") {
                if (address != "") {
                    if (drivingLicenceNo != "") {
                        if (nic != "") {
                            if (userName != "") {
                                if (password) {
                                    return true;
                                } else {
                                    alert("Please Enter Password");
                                    return false;
                                }
                            } else {
                                alert("Please Enter Username");
                                return false;
                            }
                        } else {
                            alert("Please Enter NIC");
                            return false;
                        }
                    } else {
                        alert("Please Enter Driving Licence No");
                        return false;
                    }
                } else {
                    alert("Please Enter Address");
                    return false;
                }
            } else {
                alert("Please Enter Email Address");
                return false;
            }
        } else {
            alert("Please Enter Contact");
            return false;
        }
    } else {
        alert("Please Enter Name");
        return false;
    }

}

function loadAllUnverifiedCustomers() {
    var un=0;
    $('#tblCusBody').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/customer',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                if (values[i].verified == false) {
                    let id = values[i].customerID;
                    let name = values[i].name;
                    let nic = values[i].nicNo;
                    let licence = values[i].drivingLicenceNo;

                    $('#tblCusBody').append(`<tr><th>${id}</th><td>${name}</td><td>${nic}</td><td>${licence}</td></tr>`)
                  //  <td><button type="button" class="btn btn-secondary">View</button></td><td><button type="button" class="btn btn-secondary">View</button></td><td><button type="button" class="btn btn-success vrfy">Verify</button></td>
                    un++;
                    $('#noofuncust').text(un);
                }

            }
        }
    });
}


function loadAllCustomers() {
    var all=0;
    $('#tblCusAllBody').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/customer',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                if (values[i].verified == true) {
                    let id = values[i].customerID;
                    let username = values[i].userName;
                    let name = values[i].name;
                    let nic = values[i].nicNo;
                    let licence = values[i].drivingLicenceNo;
                    let email = values[i].email;
                    let address = values[i].address;
                    let contact = values[i].contact;

                    $('#tblCusAllBody').append(`<tr><th>${id}</th><td>${username}</td><td>${name}</td><td>${nic}</td><td>${licence}</td><td>${email}</td><td>${address}</td><td>${contact}</td></tr>`)

                    all++;
                    $('#noofcust').text(all);
                    $('#noofvecust').text(all);
                }
            }
        }
    });
}

$('#btncreate').click(() => {

    if (checkvalidation()) {
        let name = $('#inputName').val();
        let contact = $('#inputContactNo').val();
        let email = $('#inputEmail').val();
        let address = $('#inputAddress').val();
        let drivingLicenceNo = $('#inputDrivingLicence').val();
        let nic = $('#inputNIC').val();
        let userName = $('#inputUserName').val();
        let password = $('#inputPassword').val();

        $.ajax({
            method: "POST",
            url: "https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/customer",
            data: JSON.stringify({
                "customerID": "",
                "name": name,
                "contact": contact,
                "email": email,
                "address": address,
                "drivingLicenceNo": drivingLicenceNo,
                "verified": 1,
                "nicNo": nic,
                "userName": userName,
                "password": password
            }),
            dataType: 'Json',
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                if (res.message == 'Success') {
                    alert('Registration Successful');
                    loadAllCustomers();
                }
            },
            error: function (ob, textStatus, error) {
                console.log("error from : " + ob + " " + textStatus + " " + error);
                if (res.message != 'Success') {
                    alert('Registration UnSuccessful! Try again');
                }
            }
        });
    }

});


//-----------------Cars-------------------------

$('#deleteCar').click(function () {
    deleteCar1();
    loadAllCars();
    clearCa();
});

function deleteCar1() {
    var chec=$('#xxx').val();
    console.log(chec);
    if (confirm("Are you sure to delete this Car")){
        $.ajax({
            url:'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car?'+$.param({id:chec}),
            type:'DELETE',
            dataType:'json',
            contentType:'application/json',
            success:function (resp) {
                if(resp.code === 200){
                    alert("success.....");
                }else{
                    alert(resp);
                }
                loadAllCars();
            }
        })
    }

}

$('#updatecar').click(function () {
    updatecardetails();
    loadAllCars();
    clearCa();
});

function updatecardetails() {

    const myData={
        carID:$('#xxx').val().toString().trim(),
        brands:$('#brand').val().toString().trim(),
        type: $('#cartype').find(":selected").text(),
        numberOfPassengers:$('#passengers').val().toString().trim(),
        transmissionType:$('#transmisiontype').find(":selected").text(),
        fuelType: $('#fueltype').find(":selected").text(),
        priceForExtraKM:$('#extrakm').val().toString().trim(),
        registrationNumber:$('#regno').val().toString().trim(),
        colour:$('#colour').find(":selected").text(),
        dailyRate:$('#dailyrate').val(),
        lossDamageWaiver:$('#lossdamage').val(),
        monthlyRate:$('#monthlyrate').val(),
        freeMillagePrice:$('#price').val(),
        freeMillageDuration:$('#duration').val()
    }
    console.log(myData);

    $.ajax({
        url:'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car',
        type:'PUT',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            if(resp.code === 200){
                alert("CAR UPDATED");

            }else{
                alert(resp);
                console.log(resp);
            }

        },
        data:JSON.stringify(myData)
    });
}





function clearCa(){
    $('#brand').val("");
    $('#passengers').val("");
    $('#regno').val("");
    $('#dailyrate').val("");
    $('#monthlyrate').val("");
    $('#price').val("");
    $('#duration').val("");
    $('#extrakm').val("");
    $('#lossdamage').val("");
}

$("#clearCar").click(function () {
    clearCa();
});

$('#savecar').click(() => {
    let brand = $('#brand').val();
    let passengers = $('#passengers').val();
    var cartype = $('#cartype').find(":selected").text();
    var fueltype = $('#fueltype').find(":selected").text();
    var transmision = $('#transmisiontype').find(":selected").text();
    let regno = $('#regno').val();
    var colour = $('#colour').find(":selected").text();
    let dailyrate = $('#dailyrate').val();
    let monthlyrate = $('#monthlyrate').val();
    let price = $('#price').val();
    let duration = $('#duration').val();
    let extrakm = $('#extrakm').val();
    let lossdamage = $('#lossdamage').val();

    $.ajax({
        method: "POST",
        url: "https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car",
        data: JSON.stringify({
            "carID": "",
            "brands": brand,
            "type": cartype,
            "numberOfPassengers": passengers,
            "transmissionType": transmision,
            "fuelType": fueltype,
            "priceForExtraKM": extrakm,
            "registrationNumber": regno,
            "colour": colour,
            "dailyRate": dailyrate,
            "monthlyRate": monthlyrate,
            "freeMillagePrice": price,
            "freeMillageDuration": duration,
            "lossDamageWaiver": lossdamage
        }),
        dataType: 'Json',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if (res.message == 'Success') {
                alert('Registration Successful');
                loadAllCars();
                clearCa();
                $('#modal').modal('hide');
            }
        },
        error: function (ob, textStatus, error) {
            console.log("error from : " + ob + " " + textStatus + " " + error);
            if (res.message != 'Success') {
                alert('Registration UnSuccessful! Try again');
            }
        }
    });
});
loadAllCars();
function loadAllCars() {
    $('#tblCarsBody').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                let id = values[i].carID;
                let regno = values[i].registrationNumber;
                let brand = values[i].brands;
                let passengers = values[i].numberOfPassengers;
                let transmision = values[i].transmissionType;
                let cartype = values[i].type;
                let colour = values[i].colour;
                let fuel = values[i].fuelType;

                $('#tblCarsBody').append(`<tr><th>${id}</th><td>${regno}</td><td>${brand}</td><td>${passengers}</td><td>${transmision}</td><td>${cartype}</td><td>${colour}</td><td>${fuel}</td></tr>`)

                $('#tblCarsBody tr').off('click');

                $('#tblCarsBody tr').on('click', function () {
                    let id=$($(this).children().get(0)).text();
                    let regno=$($(this).children().get(1)).text();
                    let brand=$($(this).children().get(2)).text();
                    let passengers=$($(this).children().get(3)).text();
                    let transmision=$($(this).children().get(4)).text();
                    let cartype=$($(this).children().get(5)).text();
                    let colour=$($(this).children().get(6)).text();
                    let fuel=$($(this).children().get(7)).text();
                    // console.log(id);
                    $('#idCar').val(id);
                    $('#xxx').val(id);
                    $('#regno').val(regno);
                    // let id=$($(this).children().get(0)).text();
                    // let regno = $($(this).children().get(1)).text();
                    // let brand = $($(this).children().get(2)).text();
                    // let passengers = $($(this).children().get(3)).text();
                    // let transmision = $($(this).children().get(4)).text();
                    // let cartype= $($(this).children().get(5).text());
                    // let colour= $($(this).children().get(6)).text();
                    // let fuel= $($(this).children().get(7)).text();
                    // console.log(id);
                    // $('#carid').val(id);
                    $('#brand').val(brand);
                    $('#passengers').val(passengers);
                    //  $('#cartype').find(":selected").text(carType1);
                    //  $('#fueltype').find(":selected").text(fuleType1);
                    // $('#transmisiontype').find(":selected").text(tranmission1);
                    // $('#regno').val(regno);
                    // $('#colour').find(":selected").text(carColour1);
                });


            }
        }
    });
}


















//-----------------------Deivers-------------------------------




$('#saveDriver').click(() => {
    let dusername = $('#dusername').val();
    let dpassword = $('#dpassword').val();
    let dname = $('#dfullname').val();
    let dcontact = $('#dcontact').val();
    let dnic = $('#NIC').val();

    $.ajax({
        method: "POST",
        url: "https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/driver",
        data: JSON.stringify({
            "driverID": "",
            "name": dname,
            "contactNo": dcontact,
            "nic": dnic,
            "userName": dusername,
            "password": dpassword,
            "available": 1
        }),
        dataType: 'Json',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if (res.message == 'Success') {
                alert('Registration Successful');
                loadAllDrivers();
                cleardriverfields();
            }
            console.log(res);
        },
        error: function (ob, textStatus, error) {
            console.log("error from : " + ob + " " + textStatus + " " + error);
            if (res.message != 'Success') {
                alert('Registration UnSuccessful! Try again');
            }
        }
    });
});
$('#deleteDriver').click(function () {
    deleteDiver();
    cleardriverfields();
});

function deleteDiver() {
    let cID=$('#duserid').val().toString().trim();
    if (confirm("Are you sure to delete this driver")){
        $.ajax({
            url:'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/driver?'+$.param({id:cID}),
            type:'DELETE',
            dataType:'json',
            contentType:'application/json',
            success:function (resp) {
                if(resp.code === 200){
                    alert("driver deleted!");
                }else{
                    alert(resp);
                }
                loadAllDrivers();
            }
        })
    }
}

$('#updateDriver').click(function () {
    updateCar();
    loadAllDrivers();
    cleardriverfields();
});

function updateCar() {
    const myData={
        driverID:$('#duserid').val().toString().trim(),
        name:$('#dfullname').val().toString().trim(),
        contactNo:$('#dcontact').val().toString().trim(),
        nic:$('#NIC').val().toString().trim(),
        userName:$('#dusername').val().toString().trim(),
        password:$('#dpassword').val().toString().trim(),
    }
    console.log(myData);

    $.ajax({
        url:'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/driver',
        type:'PUT',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            if(resp.code === 200){
                alert("CAR UPDATED");

            }else{
                alert(resp);
                console.log(resp);
            }

        },
        data:JSON.stringify(myData)
    })
}












function loadAllDrivers() {
    var dri=0;
    $('#tblDriverBody').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/driver',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                let id = values[i].driverID;
                let username = values[i].userName;
                let name = values[i].name;
                let nic = values[i].nic;
                let contactno = values[i].contactNo;
                $('#tblDriverBody').append(`<tr><th>${id}</th><td>${username}</td><td>${name}</td><td>${nic}</td><td>${contactno}</td></tr>`);

                dri++;
                $('#nooddeivers').text(dri);
                $('#noofverifyeddeivers').text(dri);


                 $('#tblDriverBody tr').off('click');

                $('#tblDriverBody tr').on('click', function () {
                    let id=$($(this).children().get(0)).text();
                    let username = $($(this).children().get(1)).text();
                    let name = $($(this).children().get(2)).text();
                    let nic = $($(this).children().get(3)).text();
                    let contactno = $($(this).children().get(4)).text();
                    $('#duserid').val(id);
                    $('#dusername').val(username);
                    $('#dfullname').val(name);
                    $('#NIC').val(nic);
                    $('#dcontact').val(contactno);
                });
            }
        }
    });
}

function cleardriverfields() {
    $('#duserid').val("");
    $('#dusername').val("");
    $('#dfullname').val("");
    $('#NIC').val("");
    $('#dcontact').val("");
}

//=======================orders========================
loadAllOrders();
function loadAllOrders() {
    $('#tblOrdersBody').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/booking',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                // let id = values[i].bookingID;
                let id='view now';
                let date = values[i].date;
                let note = values[i].note;
                let pickupdate = values[i].pickDate;
                let returndate = values[i].returnDate;
                let status = values[i].status;
                let carid = values[i].carDto.carID;
                let cusid = values[i].customerDto.customerID;
                let did = values[i].driverDto.driverID;

                $('#tblOrdersBody').append(`<tr><th>${id}</th><td>${date}</td><td>${note}</td><td>${pickupdate}</td><td>${returndate}</td><td>${status}</td><td>${carid}</td><td>${cusid}</td><td>${did}</td></tr>`);

            }
        }
    });
}

//===============Booking===================================
$('#booksearch').click(function () {
    getBookCus();
});
getBookCus();
function getBookCus() {

    $('#tblBookingReturn').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/booking',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                let id = values[i].bookingID;
                let date = values[i].date;
                let note = values[i].note;
                let pickupdate = values[i].pickDate;
                let returndate = values[i].returnDate;
                let status = values[i].status;
                let carid = values[i].carDto.carID;
                let cusid = values[i].customerDto.customerID;
                let did = values[i].driverDto.driverID;

                $('#tblBookingReturn').append(`<tr><th>${did}</th><td>${pickupdate}</td><td>${returndate}</td><td>${carid}</td><td>${cusid}</td></tr>`);



                $('#tblBookingReturn tr').off('click');

                $('#tblBookingReturn tr').on('click', function () {
                    let bookingid=$($(this).children().get(0)).text();
                    let pickupdate = $($(this).children().get(1)).text();
                    let returndate = $($(this).children().get(2)).text();
                    let carid= $($(this).children().get(3)).text();
                    let cusid = $($(this).children().get(4)).text();
                    $('#bookingCusId').val(cusid);
                    $('#bookingReturnDate').val(returndate);
                    $('#bookingOrderDate').val(pickupdate);
                    $('#bookingCarId').val(carid);
                    $('#dcontact').val(contactno);
                });



            }
        }

    });

}

$('#btnBookingAmount').click(function () {
    calTotal();
});

function calTotal() {
    let cars = $('#bookingCarsType').find(":selected").text();
    let day1 = $('#bookingOrderDate').val();
    let day2 = $('#bookingReturnDate').val();


    let pickdate = new Date(day1);
    let returndate = new Date(day2);
    console.log(cars);

    // if (cars=!'Car Type'){
    let dateIn = returndate.getDate() - pickdate.getDate();
    console.log(pickdate.getDate());
    console.log(returndate.getDate());
    console.log(dateIn);
    // }

    if (cars == "Car Type") {

    }else if(cars == "General"){
        let total=dateIn*2500;
        $('#bookingAmount').val(total);
    }else if (cars == "Premium"){
        let total=dateIn*6000;
        $('#bookingAmount').val(total);
    }else if (cars == "Luxury"){
        let total=dateIn*18000;
        $('#bookingAmount').val(total);
    }else {
        alert('select a car type....!')
    }


}

$('#btnBookingReturn').click(function () {
    placePayment();
    cleanPay();
});

function placePayment() {
    let cusid=$('#bookingCusId').val();
    let carId=$('#bookingCarId').val();
    let pickDate=$('#bookingOrderDate').val();
    let returnDate=$('#bookingReturnDate').val();
    let noOfKm=$('#bookingNoOfKm').val();
    let amount=parseInt($('#bookingAmount').val());
    let addMore=parseInt($('#bookingTotal').val());
    let lastAmount=amount+addMore;
    console.log(lastAmount);

    $.ajax({
        method: "POST",
        url: "https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/payment",
        data:JSON.stringify({
            "paymentID":"",
            "cusId":cusid,
            "carId": carId,
            "date": pickDate,
            "returnDate":returnDate,
            "noOfKm":noOfKm,
            "amount":lastAmount
        }),
        dataType:'Json',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if(res.message=='Success'){
                alert('Payment Successful');
            }
        },
        error: function (ob, textStatus, error) {
            console.log("error from : " + ob + " " + textStatus + " " + error);
            if(res.message!='Success'){
                alert('Payment UnSuccessful! Try again');
            }
        }
    });


}

function cleanPay() {
$('#bookingCusId').val("");
$('#bookingCarId').val("");
$('#bookingOrderDate').val("");
   $('#bookingReturnDate').val("");
$('#bookingNoOfKm').val("");
   $('#bookingAmount').val("");
   $('#bookingTotal').val("");
}