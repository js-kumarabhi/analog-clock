// Get references to DOM elements
const hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second")

const updateTime = () => {
  // Get current time and calculate degrees for clock hands
  let date = new Date(),
    secToDeg = (date.getSeconds() / 60) * 360,
    minToDeg = (date.getMinutes() / 60) * 360,
    hrToDeg = (date.getHours() / 12) * 360;

  // Rotate the clock hands to the appropriate degree based on the current time
  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform = `rotate(${hrToDeg}deg)`;
};
// call updateTime to set clock hands every second
setInterval(updateTime, 1000);

//call updateTime function on page load
updateTime();

// Function to check if the entered time matches the current time
function checkAlarm() {
    var inputTime = document.getElementById('selected-time').value;

    var alarmTime = new Date();
    var hours = parseInt(inputTime.split(':')[0]);
    var minutes = parseInt(inputTime.split(':')[1]);
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);

    var currentTime = new Date();
    if (alarmTime.getHours() === currentTime.getHours() &&
        alarmTime.getMinutes() === currentTime.getMinutes()) {
        var audio = document.getElementById('myAudio');
        audio.play();
        setTimeout(function() {
            audio.pause();
        }, 60000);
    }
}

// Event listener for checkbox state change
document.getElementById('toggleCheckbox').addEventListener('change', function() {
    if (this.checked) {
        setInterval(checkAlarm, 1000); // Check every second if the alarm time matches the current time
    } else {
        var audio = document.getElementById('myAudio');
        audio.pause();
    }
});

// Function to format the date and time
function formatDateTime() {
    // Get the current date and time
    const now = new Date();

    // Array to map month numbers to their names
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    // Get day of the week as a string
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = days[now.getDay()];

    // Get date, month, and year
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    // Get hours and minutes
    let hours = now.getHours();
    const minutes = ('0' + now.getMinutes()).slice(-2);

    // Convert hours to 12-hour format and determine AM/PM
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // '0' should display as '12'

    // Format the date and time string
    const formattedDateTime = `${dayOfWeek} - ${date} ${month} ${year}, ${hours}:${minutes} ${amPm}`;

    // Display formatted date and time in the element with id "datetime"
    document.getElementById("datetime").innerHTML = formattedDateTime;
}

// Call the function to display formatted date and time initially
formatDateTime();

// Update the time every second (optional)
setInterval(formatDateTime, 1000);