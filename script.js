const btnColor = document.getElementById('button-random-color');
const colorSection = document.getElementById('color-palette').children;
const pixelSection = document.getElementsByClassName('pixel');
const selected = document.getElementsByClassName('selected');

// Color Predefinition;
colorSection[0].style.backgroundColor = 'black';
colorSection[1].style.backgroundColor = 'red';
colorSection[2].style.backgroundColor = 'green';
colorSection[3].style.backgroundColor = 'blue';

let selectedColor = colorSection[0].style.backgroundColor;

// Generate Random Color from CSS-TRICKS
function storageOutput() {
  if (localStorage.colorPalette) {
    const colorReturn = JSON.parse(localStorage.getItem('colorPalette'));
    for (let i = 1; i <= colorReturn.length; i += 1) {
      colorSection[i].style.backgroundColor = colorReturn[i - 1];
    }
  }
}

function randomize() {
  const colorArray = [];
  for (let i = 1; i < colorSection.length - 1; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    colorSection[i].style.backgroundColor = colorOutput;
    colorArray.push(colorOutput);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colorArray));
}

function colorSelect(event) {
  for (let i = 0; i < selected.length; i += 1) {
    selected[i].className = 'color';
  }
  const clickedColor = event.target;
  clickedColor.className = 'selected';
  selectedColor = clickedColor.style.backgroundColor;
}

function colorDrop(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
}

// Listeners;
window.onload = function onload() {
  if (Storage) {
    storageOutput();
  } else {
    document.write('Sem suporte para Web Storage');
  }
  // colorSection[0].className = 'selected';
};

btnColor.addEventListener('click', randomize);

for (let i = 0; i < colorSection.length - 1; i += 1) {
  colorSection[i].addEventListener('click', colorSelect);
}

for (let i = 0; i < pixelSection.length; i += 1) {
  pixelSection[i].addEventListener('click', colorDrop);
}
