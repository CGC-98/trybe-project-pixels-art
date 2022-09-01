const btnColor = document.getElementById('button-random-color');
const btnClear = document.getElementById('clear-board');
const selected = document.getElementsByClassName('selected');
const colorSection = document.getElementById('color-palette').children;
const pixelSection = document.getElementsByClassName('pixel');

// Class/Color Predefinition;
colorSection[0].classList.add('selected');
colorSection[0].style.backgroundColor = 'black';
colorSection[1].style.backgroundColor = 'red';
colorSection[2].style.backgroundColor = 'green';
colorSection[3].style.backgroundColor = 'blue';

let selectedColor = selected[0].style.backgroundColor;

function storageInPalette(colorArray) {
  localStorage.setItem('colorPalette', JSON.stringify(colorArray));
}

function storageOutPalette() {
  if (localStorage.colorPalette) {
    const paletteReturn = JSON.parse(localStorage.getItem('colorPalette'));
    for (let i = 1; i <= paletteReturn.length; i += 1) {
      colorSection[i].style.backgroundColor = paletteReturn[i - 1];
    }
  }
}

function storageInBoard() {
  const boardArray = [];
  for (let i = 0; i < pixelSection.length; i += 1) {
    boardArray.push(pixelSection[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(boardArray));
}

function storageOutBoard() {
  if (localStorage.pixelBoard) {
    const boardReturn = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < boardReturn.length; i += 1) {
      pixelSection[i].style.backgroundColor = boardReturn[i];
    }
  }
}

function onLoad() {
  if (Storage) {
    storageOutPalette();
    storageOutBoard();
  } else {
    document.write('Sem suporte para Web Storage');
  }
}

// Generate Random Color from CSS-TRICKS
function randomize() {
  const colorArray = [];
  for (let i = 1; i < colorSection.length - 1; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    colorSection[i].style.backgroundColor = colorOutput;
    colorArray.push(colorOutput);
  }
  storageInPalette(colorArray);
}

function colorSelect(event) {
  for (let i = 0; i < selected.length; i += 1) {
    selected[i].classList.remove('selected');
  }
  const clickedColor = event.target;
  clickedColor.classList.add('selected');
  selectedColor = clickedColor.style.backgroundColor;
}

function colorDrop(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
  storageInBoard();
}

function pixelClear() {
  for (let i = 0; i < pixelSection.length; i += 1) {
    pixelSection[i].style.backgroundColor = 'white';
  }
}

// Listeners;
window.addEventListener('load', onLoad);

btnColor.addEventListener('click', randomize);

btnClear.addEventListener('click', pixelClear);

for (let i = 0; i < colorSection.length - 1; i += 1) {
  colorSection[i].addEventListener('click', colorSelect);
}

for (let i = 0; i < pixelSection.length; i += 1) {
  pixelSection[i].addEventListener('click', colorDrop);
}
