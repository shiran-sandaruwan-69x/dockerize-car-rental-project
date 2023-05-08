
 function UploadImage() {
var fileObject = $("#file")[0].files[0];//access file object from input field
 var fileName = $("#file")[0].files[0].name; //get file name
// var data = new FormData(); //setup form data object to send file data
// data.append("file", fileObject, fileName); //append data
// $.ajax({
//     url: 'http://localhost:8080/Car_Rental/api/vt/upload',
//     method: 'post',
//     // async: true,
//     mimeType: "multipart/form-data",
//     processData: false, //stop processing data of request body
//     contentType: false, // stop setting content type by jQuery
//     data: data,
//     success: function () {
//         alert("File Uploaded");
//     }
// });

     //
     // var form = new FormData();
     // form.append("myFile", fileObject, fileName);
     //
     // var settings = {
     //     url: "https://car-rent-zf0g.onrender.com/Car_Rental/api/vt/upload",
     //     method: "POST",
     //     //timeout: 0,
     //     processData: false,
     //     mimeType: "multipart/form-data",
     //     contentType: false,
     //     data: form
     // };
     //
     // $.ajax(settings).done(function (response) {
     //    alert("hari bn");
     // });
 }
//










 function UploadImage2() {
     var fileObject = $("#file2")[0].files[0];//access file object from input field
     var fileName = $("#file2")[0].files[0].name; //get file name
// var data = new FormData(); //setup form data object to send file data
// data.append("file", fileObject, fileName); //append data
// $.ajax({
//     url: 'http://localhost:8080/Car_Rental/api/vt/upload',
//     method: 'post',
//     // async: true,
//     mimeType: "multipart/form-data",
//     processData: false, //stop processing data of request body
//     contentType: false, // stop setting content type by jQuery
//     data: data,
//     success: function () {
//         alert("File Uploaded");
//     }
// });


     var form = new FormData();
     form.append("myFile", fileObject, fileName);

     // var settings = {
     //     url: "https://car-rent-zf0g.onrender.com/Car_Rental/api/vt/upload",
     //     method: "POST",
     //     //timeout: 0,
     //     processData: false,
     //     mimeType: "multipart/form-data",
     //     contentType: false,
     //     data: form
     // };
     //
     // $.ajax(settings).done(function (response) {
     //     alert("hari bn");
     // });
 }

















// $('#btnUpload').click(function () {
//     //formdata type ekan object ekak hadala ekata file eka data tila danna ona
//     var data=new FormData();
//
//     //ewana file eka data tika gaththa
//     var fileObject = $('#file')[0].files[0];
//
//     //file eka name eka ganna ek
//     var fileName = $('#file')[0].files[0].name;
//
//     //object ekata dana eka
//     data.append('file',fileObject,fileName);
//
//
//
//     $.ajax({
//         url:'http://localhost:8080/Car_Rental/api/v1/customer/upload',
//         method:'post',
//         async:true,
//         //browser eka thaniyama data tika yawanna ussaha karana nisa fale kara
//         processData: false,
//         //browser eka auto type eka da gannawa apita danna epa kiynw type eka
//         contentType:false,
//         data:data
//     });
//
// });






$('#btncreate').click(()=>{
  if (checkvalidationCustomer()){
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
      headers.append('Origin','http://localhost:3000');

      // UploadImage();
    //  UploadImage2();
      if (checkvalidationCustomer()){
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
              data:JSON.stringify({
                  "customerID":"",
                  "name":name,
                  "contact": contact,
                  "email": email,
                  "address":address,
                  "drivingLicenceNo":drivingLicenceNo,
                  "nicNo":nic,
                  "verified":true,
                  "userName":userName,
                  "password":password
              }),
              dataType:'Json',
              contentType: "application/json",
              success: function (res) {
                  if(res.message=='Success'){
                      alert('Registration Successful');
                  }
              },
              error: function (ob, textStatus, error) {
                  console.log("error from : " + ob + " " + textStatus + " " + error);
                  if(res.message!='Success'){
                      alert('Registration UnSuccessful! Try again');
                  }
              }
          });
      }

  }


});

function checkLogin(){
    let userName = $('#email1').val();
    let password = $('#password1').val();
    if (userName!=""){
        if (password!=""){
            return true;
        }else {
            alert("enter user password");
            return false;
        }
    }else {
        alert("enter user name");
        return false;
    }
}



$('#submit1').click(function () {

    if (checkLogin()){
        let userName = $('#email1').val();
        let password = $('#password1').val();
        console.log(userName,password);
        if (userName == ""){
            alert('Enter User Name..!');
        }else if(password == ""){
            alert('Enter Password..!');
        }else{
            $.ajax({
                method: "GET",
                url: 'https://car-rent-zf0g.onrender.com/CarRentSystem/api/v1/customer/'+userName+'/'+password,
                success:function (res) {
                    if(res.message == 'customer'){
                        document.cookie = "user="+res.data.name;
                        document.cookie = "userID="+res.data.customerID;
                        window.location.replace("CustomerForm.html");
                    }else if(res.message == 'driver'){
                        document.cookie = "user="+res.data.name;
                        document.cookie = "userID="+res.data.DriverID;
                        // localStorage.setItem('loggedUser', res);
                        window.location.replace("DriverForm.html");
                    }else if(res.message == 'admin'){
                        document.cookie = "user="+res.data.name;
                        document.cookie = "userID="+res.data.adminID;
                        // localStorage.setItem('loggedUser', res);
                        window.location.replace("AdminForm.html");
                    }
                },
                error:function (ob, textStatus, error) {
                    console.log("error from : " + error);
                }
            });
    }


    }

});

function checkvalidationCustomer() {

    let name = $('#inputName').val();
    let contact = $('#inputContactNo').val();
    let email = $('#inputEmail').val();
    let address = $('#inputAddress').val();
    let drivingLicenceNo = $('#inputDrivingLicence').val();
    let nic = $('#inputNIC').val();
    let userName = $('#inputUserName').val();
    let password = $('#inputPassword').val();

    if (name!=""){
        if (contact!=""){
            if(email!=""){
                if (address!=""){
                    if (drivingLicenceNo!=""){
                        if (nic!=""){
                            if (userName!=""){
                                if (password){
                                    return true;
                                }else{
                                    alert("Please Enter Password");
                                    return false;
                                }
                            }else{
                                alert("Please Enter Username");
                                return false;
                            }
                        }else{
                            alert("Please Enter NIC");
                            return false;
                        }
                    }else{
                        alert("Please Enter Driving Licence No");
                        return false;
                    }
                }else{
                    alert("Please Enter Address");
                    return false;
                }
            }else{
                alert("Please Enter Email Address");
                return false;
            }
        }else {
            alert("Please Enter Contact");
            return false;
        }
    }else{
        alert("Please Enter Name");
        return false;
    }

}