const btnColor = document.getElementById('button-random-color');
const colorSection = document.querySelector('#colorSection').children;

console.log(colorSection[1]);

// Generate Random Color from CSS-TRICKS
function attribute() {
  for (let i = 1; i < colorSection.length; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    console.log(colorOutput);
    colorSection[i].style.backgroundColor = colorOutput;
  }
}

btnColor.addEventListener('click', attribute);
