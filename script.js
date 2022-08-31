const btnColor = document.getElementById('button-random-color');
const colorSection = document.querySelector('#color-palette').children;

// Generate Random Color from CSS-TRICKS
function attribute() {
  for (let i = 1; i < colorSection.length - 1; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    colorSection[i].style.backgroundColor = colorOutput;
    const setPalette = `colorPalette${i}`;
    localStorage.setItem(setPalette, colorOutput);
  }
}

function storageCheck() {
  if (localStorage.colorPalette1) {
    colorSection[1].style.backgroundColor = localStorage.colorPalette1;
    colorSection[2].style.backgroundColor = localStorage.colorPalette2;
    colorSection[3].style.backgroundColor = localStorage.colorPalette3;
  }
}

window.onload = function onload() {
  if (Storage) {
    storageCheck();
  } else {
    document.write('Sem suporte para Web Storage');
  }
};

// Listeners;
btnColor.addEventListener('click', attribute);

// function changeColor() {
//   var userColor = document.getElementById('colorID').value;
//   localStorage.setItem('storedValue', document.body.style.backgroundColor = userColor);
// }

// // if there is a value stored, update color picker and background color
// if (localStorage.storedValue) {
//   document.getElementById('colorID').value = localStorage.storedValue;
//   document.body.style.backgroundColor = localStorage.storedValue;
// }
