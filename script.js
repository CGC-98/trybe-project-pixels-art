const btnColor = document.getElementById('button-random-color');
const btnClear = document.getElementById('clear-board');
const btnBoard = document.getElementById('generate-board');
const boardBox = document.getElementById('pixel-board');
const selected = document.getElementsByClassName('selected');
const colorSection = document.getElementById('color-palette').children;
const lineSection = document.getElementsByClassName('boardLine');
let pixelSection = document.getElementsByClassName('pixel');

// Class/Color Predefinition;
function baselineColor() {
  const baseColorArray = ['black', 'red', 'green', 'blue'];
  colorSection[0].classList.add('selected');
  for (let i = 0; i < baseColorArray.length; i += 1) {
    colorSection[i].style.backgroundColor = baseColorArray[i];
  }
}

baselineColor();
let selectedColor = selected[0].style.backgroundColor;

// Dependent Functions;
function storageInArt() {
  const boardArray = [];
  for (let i = 0; i < pixelSection.length; i += 1) {
    boardArray.push(pixelSection[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(boardArray));
}

function storageOutArt() {
  if (localStorage.pixelBoard) {
    const artReturn = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < artReturn.length; i += 1) {
      pixelSection[i].style.backgroundColor = artReturn[i];
    }
  }
}

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

function colorPick() {
  for (let i = 0; i < colorSection.length - 1; i += 1) {
    colorSection[i].addEventListener('click', colorSelect);
  }
}

function colorDrop(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
  storageInArt();
}

function pixelClear() {
  for (let i = 0; i < pixelSection.length; i += 1) {
    pixelSection[i].style.backgroundColor = 'white';
  }
}

function storageInBoard(numSize) {
  localStorage.setItem('boardSize', numSize);
}

function boardX(i, sizeN) {
  for (let j = 0; j < sizeN; j += 1) {
    const newPixel = document.createElement('span');
    newPixel.className = 'pixel';
    lineSection[i].appendChild(newPixel);
  }
  pixelSection = document.getElementsByClassName('pixel');
}

function boardY(sizeN) {
  for (let i = 0; i < sizeN; i += 1) {
    const newLine = document.createElement('div');
    newLine.className = 'boardLine';
    boardBox.appendChild(newLine);
    boardX(i, sizeN);
  }
}

function boardClear() {
  while (boardBox.hasChildNodes()) {
    boardBox.removeChild(boardBox.firstChild);
  }
}

function boardCheck(numSize) {
  boardClear();
  if (numSize < 5) {
    boardY(5);
  } else if (numSize > 50) {
    boardY(50);
  } else {
    boardY(parseFloat(numSize));
  }
}

function boardBtn() {
  const numSize = document.getElementById('board-size').value;
  if (!numSize || numSize === 0) {
    window.alert('Board inválido!');
  } else {
    storageInBoard(numSize);
    boardCheck(numSize);
    for (let i = 0; i < pixelSection.length; i += 1) {
      pixelSection[i].addEventListener('click', colorDrop);
    }
  }
}

function storageOutBoard() {
  if (localStorage.boardSize) {
    const boardReturn = localStorage.getItem('boardSize');
    document.getElementById('board-size').value = parseFloat(boardReturn);
  }
}

function onLoad() {
  if (Storage) {
    colorPick();
    storageOutBoard();
    btnBoard.click();
    storageOutPalette();
    storageOutArt();
  } else {
    document.write('Sem suporte para Web Storage');
  }
}

// Listeners;
window.addEventListener('load', onLoad);
btnColor.addEventListener('click', randomize);
btnClear.addEventListener('click', pixelClear);
btnBoard.addEventListener('click', boardBtn);
