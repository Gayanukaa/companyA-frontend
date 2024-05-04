import axios from "axios";
import Swal from "sweetalert2";


const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true, })


export function defaultReq(method, url, data, callback1 = null, callback2 = null, callback3 = null) {
    var options = {
        method: method,
        url: 'https://spring-boot-companya.azurewebsites.net/' + url,
        headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        data: data
    };

    axios.request(options)
        .then(function (response) {
            if (response.status === 200 || response.status === 201) {
                if (callback1) {
                    callback1(response);
                }
            } else {
                if (callback2) {
                    callback2(response.data);
                }
            }
        })
        .catch(function (error) {
            if (callback3) {
                callback3(error.response ? error.response.data : error.message);
            }
        });
}






export function swalFireReq1(method,url,data,swal1=null,swal2=null,callback1=null,swal3=null){
    var options = {
        method:method,
        url: 'http://localhost:3001/'+url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        data: data
    };

    axios.request(options).then(function (response) {
        // console.log(response)
        if (response.status === 200 || response.status === 201) {
            if(swal1){
                Swal.fire({
                    title: 'Success!', text: swal1, icon: 'success', confirmButtonText: 'OK'
                })
            }
            if(callback1){
                callback1(response);
            }
        }else{
            if(swal2){
                Swal.fire({ title: 'Error!', text: swal2, icon: 'error', confirmButtonText: 'OK' })
               }
        }
    }).catch(function (error) {
        // console.log("error tam")
       if(swal3){
        Swal.fire({ title: 'Error!', text: swal3, icon: 'error', confirmButtonText: 'OK' })
       }
    });
}









export function swalFireReq2(method,url,data,swal1=null,swal2=null,callback1=null,swal3=null){
    var options = {
        method:method,
        url: 'http://localhost:3001/'+url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        data: data
    };

    axios.request(options).then(function (response) {
        if (response.status === 200 || response.status === 201) {
            if(swal1){
                Toast.fire({ icon: 'success', title: swal1 })
            }if(callback1){
                callback1(response);
            }
        }else{
            if(swal2){
                Swal.fire({ title: 'Error!', text: swal2, icon: 'error', confirmButtonText: 'OK' })
               }
        }
    }).catch(function (error) {
       if(swal3){
        Swal.fire({ title: 'Error!', text: swal3, icon: 'error', confirmButtonText: 'OK' })
       }
    });
}


