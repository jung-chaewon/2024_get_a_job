const container = document.getElementById('container');
const randomWaveButton = document.getElementById('randomWave');
const circlesArr = [];
let rows = 15;
let cols = 15;

for (let i = 0; i < cols; i++) {
    circlesArr[i] = [];
    for (let j = 0; j < rows; j++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        container.appendChild(circle);
        circlesArr[i].push(circle);
    }
}
circlesArr.forEach((cols, i) => {
    cols.forEach((circle, j) => {
        circle.addEventListener('click', () => {
            growCircles(i, j);
        });
    });
});
function growCircles(i, j) {
    if (circlesArr[i] && circlesArr[i][j]) {
        circlesArr[i][j].classList.add('grow');
        const promises = [];
        promises.push(new Promise((resolve) => {
            setTimeout(() => {
                growCircles(i - 1, j)
                resolve();
            }, 100);
        }));
        promises.push(new Promise((resolve) => {
            setTimeout(() => {
                growCircles(i + 1, j)
                resolve();
            }, 100);
        }));
        promises.push(new Promise((resolve) => {
            setTimeout(() => {
                growCircles(i, j - 1)
                resolve();
            }, 100);
        }));
        promises.push(new Promise((resolve) => {
            setTimeout(() => {
                growCircles(i, j + 1)
                resolve();
            }, 100);
        }));
        Promise.all(promises).then(() => {
            setTimeout(() => {
                circlesArr[i][j].classList.remove('grow');
            }, 200);
        });
    }
}

function makeRandomWave() {
    const randomCoords = [Math.floor(Math.random() * cols), Math.floor(Math.random() * cols)];
    growCircles(randomCoords[0], randomCoords[1]);
}
randomWaveButton.addEventListener('click', makeRandomWave);