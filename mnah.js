let canvas = document.querySelector('.canvas');
let car = document.querySelector('.car')
let canvasWidth = canvas.offsetWidth;
let canvasHeight = canvas.offsetHeight;
let carWidth = car.offsetWidth;
let carHeight = car.offsetHeight;

//Load

window.addEventListener('load', () => {
   for (let i = 0; i < 10; i++) {
    let roadLine = document.createElement('div');
    roadLine.classList.add('road_line');
    roadLine.style.top = i * 20 + '%';
    canvas.append(roadLine);
    console.log(roadLine);
   }

   console.log(canvas.clientLeft);
})

//End Load

//Car Move
function carMove(){
    window.addEventListener('keydown', (e) => {
        let key = e.code;
        if(key === "KeyW"){
            let currentBottom = parseFloat(car.style.bottom) || 0;
            if(currentBottom + carHeight < canvasHeight - carHeight){
                car.style.bottom = (currentBottom + 20) + 'px';
                car.style.transform = 'rotate(0deg)';
            }
        }

        if(key === "KeyS"){
            let currentBottom = parseFloat(car.style.bottom) || 0;
            if(currentBottom > 0){
                car.style.bottom = (currentBottom - 20) + 'px';
                car.style.transform = 'rotate(180deg)';
            }
        }

        if(key === "KeyD"){
            if (key === "KeyD") {
                let left = parseFloat(car.style.left) || 0;
                if (left + carWidth < canvasWidth - carWidth) {
                    car.style.left = (left + 20) + 'px';
                    car.style.transform = 'rotate(90deg)';
                }
            }
        }

        if(key === "KeyA"){
            let left = parseFloat(car.style.left) || 0;
            if (left > 0) {
                car.style.left = (left - 20) + 'px';
                car.style.transform = 'rotate(270deg)';
            }
        }
    })
}

carMove();

//End Car Move