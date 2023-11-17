//getting the userdata from setting page 
const nameOfUser = document.getElementById('name');
const locationOfUser = document.getElementById('location');



//save to the local storage 
function saveUserdata(){
    if(nameOfUser.value && locationOfUser.value){
        localStorage.setItem('username', nameOfUser.value);
        localStorage.setItem('location', locationOfUser.value);
    }
    else if(nameOfUser.value){
        localStorage.setItem('username', nameOfUser.value);
    }
    else if(locationOfUser.value){
        localStorage.setItem('location', locationOfUser.value);
    }
    else{
        return
    }

}

const saveSetting = document.getElementById('saveSetting')
saveSetting.addEventListener('click', function(){
    saveUserdata();
})