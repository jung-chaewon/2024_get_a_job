const timer = document.getElementById('stopwatch');
const lapBox = document.getElementById('lapBox');
let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;

const timerCycle = () => {
    if (!stoptime) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec++;

        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hr++;
            min = 0;
            sec = 0;
        }

        const formatTime = (time) => time < 10 ? '0' + time : time;

        timer.innerHTML = `${formatTime(hr)}:${formatTime(min)}:${formatTime(sec)}`;
        setTimeout(timerCycle, 1000);
    }
};

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function lapTimer() {
    const lapTime = document.createElement('h1');
    lapTime.innerHTML = `${formatTime(hr)}:${formatTime(min)}:${formatTime(sec)}`;
    lapBox.append(lapTime);
}

function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
        clearInterval();
    }
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
    stoptime = true;
    hr = 0;
    min = 0;
    sec = 0;
    while (lapBox.firstChild) {
        lapBox.removeChild(lapBox.firstChild);
    }
}

// Helper function to format time
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}