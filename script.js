const btnColor = document.getElementById('button-random-color');
const colorSection = document.querySelector('#color-palette').children;

// Generate Random Color from CSS-TRICKS
function attribute() {
  const colorArray = [];
  for (let i = 1; i < colorSection.length - 1; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    colorSection[i].style.backgroundColor = colorOutput;
    colorArray.push(colorOutput);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colorArray));
}

function storageCheck() {
  if (localStorage.colorPalette) {
    const colorReturn = JSON.parse(localStorage.getItem('colorPalette'));
    for (let i = 1; i <= colorReturn.length; i += 1) {
      colorSection[i].style.backgroundColor = colorReturn[i - 1];
    }
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
