
loadAllDrivers();

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

$('#username').text(getCookie('user'));


let btnarray = ['#btn-home','#btn-customers','#btn-cars','#btn-orders','#btn-payments','#btn-reports','#btn-drivers'];
function setClass() {
    for (id in btnarray) {
        $(btnarray[id]).removeClass('btn-custom-selected').addClass('btn-custom');
    }
}

$('#btn-home').click(()=>{
    hideall();
    setClass();
    $('#btn-home').addClass('btn-custom-selected');
    $('#Dashboard').show();

});

$('#btn-customers').click(()=>{
    hideall();
    setClass();
    $('#btn-customers').addClass('btn-custom-selected');
    $('#Customers').show();

});

$('#btn-cars').click(()=>{
    hideall();
    setClass();
    $('#btn-cars').addClass('btn-custom-selected');
    $('#Cars').show();
});

$('#btn-orders').click(()=>{
    setClass();
    $('#btn-orders').addClass('btn-custom-selected');
});

$('#btn-payments').click(()=>{
    setClass();
    $('#btn-payments').addClass('btn-custom-selected');
});

$('#btn-reports').click(()=>{
    setClass();
    $('#btn-reports').addClass('btn-custom-selected');

});

$('#btn-drivers').click(()=>{
    setClass();
    $('#btn-drivers').addClass('btn-custom-selected');

});

let hide = ['#Dashboard','#Customers','#Cars'];

function hideall(){
    for (let i in hide) {
        $(hide[i]).hide();
    }

}

$('#btn-dri-home').click(function () {

});

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
                $('#driverbody').append(`<tr><th>${id}</th><td>${username}</td><td>${name}</td><td>${nic}</td><td>${contactno}</td></tr>`);

                // dri++;
                // $('#nooddeivers').text(dri);
                // $('#noofverifyeddeivers').text(dri);


                // $('#tblDriverBody tr').off('click');

                // $('#tblDriverBody tr').on('click', function () {
                //     let username = $($(this).children().get(1)).text();
                //     let name = $($(this).children().get(2)).text();
                //     let nic = $($(this).children().get(3)).text();
                //     let contactno = $($(this).children().get(4)).text();
                //     $('#dusername').val(username);
                //     $('#dfullname').val(name);
                //     $('#NIC').val(nic);
                //     $('#dcontact').val(contactno);
                // });
            }
        }
    });
}

loadAllOrders();
function loadAllOrders() {
    $('#tblOrdersBody').empty();
    $.ajax({
        url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/booking',
        method: 'GET',
        success: function (res) {
            let values = res.data;
            for (i in values) {
                let id = values[i].bookingID;
                // let id='view now';
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