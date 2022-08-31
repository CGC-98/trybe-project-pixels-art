const btnColor = document.getElementById('button-random-color');
const colorSection = document.querySelector('#colorSection').children;

// Generate Random Color from CSS-TRICKS
function attribute() {
  for (let i = 1; i < colorSection.length; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    colorSection[i].style.backgroundColor = colorOutput;
    const toStore = `colorPallete[${i}]`;
    localStorage.setItem(toStore, colorOutput);
  }
}

btnColor.addEventListener('click', attribute);

// localStorage;
// window.onload = function () {
//   if (typeof (Storage) !== 'undefined') {
//     if (localStorage.colorPalette !== undefined) {
//       colorSection[1].style.backgroundColor = localStorage.getItem('colorPalette');
//     }
//   } else {
//     document.write('Sem suporte para Web Storage');
//   }
// };
