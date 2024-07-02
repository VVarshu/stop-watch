let startTime, updatedTime, difference, tInterval, running = false, lapCounter = 0;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        difference = new Date().getTime() - startTime;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startTime = null;
    updatedTime = null;
    difference = null;
    lapCounter = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${formatTime(updatedTime)}`;
        laps.appendChild(lapTime);
    }
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
