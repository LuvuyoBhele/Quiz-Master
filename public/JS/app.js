let count = 30; // initial time in seconds
let counter = null; // interval ID

function startTimer(count=initial) {
  // stop existing timer if running
  //is the length of the question timer
  if (counter) {
    //here we clear any active timer
    clearInterval(counter);
    counter = null;
  }

  //reset count to initial value
  //name the html element that displays the timer id
  //
  count = initial;
  const el = document.getElementById('timer');
  if (el) el.textContent = String(count); //rename this to match your html element id
  //create a function that counts down the timer every second
  counter = setInterval(() => {
    count--;
    //using tranary operator to display "Time's up!" when count reaches 0
    if (el) el.textContent = (count > 0) ? String(count) : "Time's up!";
    if (count <= 0) {
      clearInterval(counter);
      counter = null;
      // timer finished — add callback or event here if needed
    }
  }, 1000);
}

function stopTimer() {
  if (counter) {
    clearInterval(counter);
    counter = null;
  }
}

// Start the timer when the page finishes loading
document.addEventListener('DOMContentLoaded', () => {
  startTimer();
});

$('#start-time-btn').click(function() {
    startTimer();
    console.log('Timer started');
});



