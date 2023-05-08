function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

$('#user').text(getCookie('user'));
loadAllCars();

let btnarray = ['#btn-cust-home','#btn-cust-cars','#btn-cust-orders','#btn-cust-payments'];
function setClass() {
    for (let id in btnarray) {
        $(btnarray[id]).removeClass('btn-custom-selected').addClass('btn-custom');
    }
}

$('#btn-cust-home').click(()=>{
    setClass();
    hideall();
    $('#btn-cust-home').addClass('btn-custom-selected');
    $('#Cust-Dashboard').fadeIn(1000);

});

$('#btn-cust-cars').click(()=>{
    loadAllCars();
    setClass();
    hideall();
    $('#btn-cust-cars').addClass('btn-custom-selected');
    $('#All-cars').fadeIn(1000);

});

$('#btn-cust-orders').click(()=>{
    setClass();
    hideall();
    $('#btn-cust-orders').addClass('btn-custom-selected');
    $('#orders').fadeIn(1000);
});

$('#btn-cust-payments').click(()=>{
    setClass();
    $('#btn-cust-payments').addClass('btn-custom-selected');
});

$('#logout').click(()=>{
    if (confirm("Are you sure to Sign-out")){
        window.location.replace("index.html");

    }else{

    }
});

$('#carsearch').click(()=>{
    loadSearchCars();
});

let hide = ['#Cust-Dashboard','#All-cars','#orders'];

function hideall(){
    for (let i in hide) {
        $(hide[i]).hide();
    }

}


loadAllCars();
function loadAllCars() {
    $('#tblCar').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                let id = values[i].carID;
                let brand = values[i].brands;
                let passengers = values[i].numberOfPassengers;
                let transmision = values[i].transmissionType;
                let cartype = values[i].type;
                let colour = values[i].colour;
                let fuel = values[i].fuelType;

                $('#tblCar').append(`<tr><th>${id}</th><td>${brand}</td><td>${passengers}</td><td>${transmision}</td><td>${cartype}</td><td>${colour}</td><td>${fuel}</td></tr>`)
            }
        }
    });
}

function loadSearchCars() {
    let tp = $('#carstype').find(":selected").text();
    $('#tblCarSerch').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car/type/'+tp,
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                let id = values[i].carID;
                let brand = values[i].brands;
                let passengers = values[i].numberOfPassengers;
                let transmision = values[i].transmissionType;
                let cartype = values[i].type;
                let colour = values[i].colour;
                let fuel = values[i].fuelType;

                $('#tblCarSerch').append(`<tr><th>${id}</th><td>${brand}</td><td>${passengers}</td><td>${transmision}</td><td>${cartype}</td><td>${colour}</td><td>${fuel}</td></tr>`)
                // <td><button class="btn btn-secondary">View Image</button></td>
                $('#tblCarSerch tr').off('click');

                $('#tblCarSerch tr').on('click', function () {
                    let carid = $($(this).children().get(0)).text();
                    $('#carid').val(carid);
                });
            }
        }
    });
}
//

function vaidateBook(){
    let carid=$('#carid').val();
    let pickupDate = $('#pickupdate').val();
    let returnDate = $('#returndate').val();

    if (carid!=""){
        if (pickupDate!=""){`+`

        }else {
            alert("please add car you want...");
            return false;
        }
    }else {
        alert("please add car you want...");
        return false;
    }

}


//
$('#placeorder').click(function () {

    let val = getCookie('userID');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;

    let pickupDate = $('#pickupdate').val();
    let returnDate = $('#returndate').val();
    let cusID = val;
    let carID = $('#carid').val();
    let driverID = $('#txtDriverID').val();

    let customer;
    let car;
    let driver;

    $.ajax({
        method: 'GET',
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/customer/'+cusID,
        async: false,
        success: function (res) {
            customer = res.data;
        }
    });

    $.ajax({
        method: 'GET',
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/car/'+carID,
        async: false,
        success: function (res) {
            car = res.data;
        }
    });

    $.ajax({
        method: 'GET',
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/driver/stat/available',
        async: false,
        success: function (res) {
            driver = res.data;
        }
    });

    console.log("today : ",today)
    console.log("pickupDate : ",pickupDate)
    console.log("returnDate : ",returnDate)
    console.log(customer);
    console.log(car);
    console.log(driver);

    $.ajax({
        method: 'POST',
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/booking',
        data: JSON.stringify({
            "bookingID": "",
            "date": today,
            "pickDate": pickupDate,
            "status": "Ordered",
            "note": "normal",
            "returnDate": returnDate,
            "customerDto": customer,
            "carDto": car,
            "driverDto": driver
        }),
        async: false,
        dataType: 'Json',
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if (res.message == 'Success'){
                alert('Booking successFul..!');
            }
        }
    });
});

