//this is the counter variable for the number of tasks added 
let count = 0;
let tasklist = document.getElementById('tasklist');


//load the tasks 
function loadPreviousSessionTasks(){
    //username of the user
    const username =  document.getElementById('Username');
    username.innerText  = localStorage.getItem('username');

    let loadSession = localStorage.getItem('savedData');
    if (loadSession){
        //displaying on the page
       tasklist.innerHTML = loadSession;
    }
}

function saveData(){
    let task = tasklist.innerHTML; 
    localStorage.setItem('savedData', task);
}



//to do list functionality 
document.addEventListener('DOMContentLoaded', () => {

    loadPreviousSessionTasks();

    document.querySelector('form').onsubmit = () => {
        const inputTask = document.querySelector('form')

        if (inputTask.value === ''){
            alert('write something')
            return false;
        }
        else{
            const task = document.querySelector('#task');
            const li = document.createElement('li');
            li.className = "list-group-item"
            li.innerHTML = task.value;
            
            const span = document.createElement('span');
            span.innerHTML = '\u00d7';

            //show on the Html document page 
            document.querySelector('#tasklist').append(li);
            li.appendChild(span);

            //save to local storage 
            saveData();


            //clear input field 
            task.value = '';

            //stop form from submitting 
            return false; 
        
        }
   }; 
});

//removing of task and strike though when marked as checkd 
tasklist.addEventListener('click', function(event){
    if( event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData();
    }
    else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove();
        saveData();
    }
}, false)



///digital clock showing onthe page 
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    document.getElementById('date').innerHTML =  h + ":" + m + ":" + s;

    setTimeout(startTime, 1000);
}
  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
};

document.addEventListener('DOMContentLoaded', startTime);



//tips showing code 

function randomTips(){
    const tips = {"Mahatma Gandhi":"Learn as if you will live forever, live like you will die tomorrow.",
    "Eleanor Roosevelt": "When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.",
    "Diane McLaren": "It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest.",
    "Herman Malville": "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Henry David Thoreau": "Success usually comes to those who are too busy looking for it.",
    "Tony Robbins": "Setting goals is the first step in turning the invisible into the visible.",
    "John Wooden": "Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable",
    "W. P. Kinsella": "Success is getting what you want, happiness is wanting what you get."
    }
    
    const header = Object.keys(tips)
    const lengthHeader = header.length
    //chosing a random index
    const randomH = Math.ceil(Math.random()*lengthHeader) - 1
    console.log(randomH);
    //accesing that index content 
    const tipBody = tips[header[randomH]]
    const tipHead = header[randomH]

    //creating object for returning the tips
    let tip = {};
    tip[tipHead] = tipBody;
    return tip 
};

document.addEventListener('DOMContentLoaded', function(){
    const cardTitle = document.querySelector('.card-title') 
    const cardText = document.querySelector('.card-text')
    const tip = randomTips()
    cardTitle.innerText = Object.keys(tip)[0]
    cardText.innerText = tip[Object.keys(tip)[0]]
});



//weather showing on the page using weatherapi if this does not working that likely means you are seeing the code 
//after 30th nov 2023. this is my end of the trial period date of that weather api if you want to revive this feature again 
//go to search weatherapi.com on google sign in then they will give you an api key just replace after key= {your apikey}
//but till before 

document.addEventListener('DOMContentLoaded', function(){

    const savedLocation = localStorage.getItem('location');

    fetch(`http://api.weatherapi.com/v1/current.json?key=53024ea6362d4014a7124444231611&q=${savedLocation}&aqi=no`)
    .then(response => response.json())
    .then( data => {
        //temperature display as text 
        const temp = document.querySelector('#temp')
        temp.innerText = data.current.temp_c

        const tempIcon = document.querySelector('#weather-condition-icon')
        tempIcon.src = 'https:'+ data.current.condition.icon

        //location showing 
        const location = document.querySelector('#location')
        location.innerText = data.location.name + ", " +data.location.region + ", " + `(${data.location.country})`

        console.log(data)
        console.log(data.current.temp_c)
        console.log('https:'+ data.current.condition.icon)
    });
});
