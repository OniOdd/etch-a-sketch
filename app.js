'use strict';

App();

function App() {
  const root = document.documentElement;
  const header = document.querySelector('#header');
  const form = document.querySelector('#form');
  const input = document.querySelector('#value-grid');
  const enterBtn = document.querySelector('#btn-enter');
  const resetBtn = document.querySelector('#btn-reset');
  const grid = document.querySelector('#grid');

  setGridHeight();
  setGrid();

  function setGrid() {
    enterBtn.addEventListener('click', () => createGrid());

    function createGrid() {
      const value = input.value;
      if (value >= 1 && value <= 100) {
        grid.innerHTML = '';
        changeVariablesValue(value);
        pushDivs(value);
        input.value = '';
      } else {
        alert('The value is not valid. Enter a number from 1 to 100.');
        input.value = '';
        input.focus();
      }
    }

    function changeVariablesValue(value) {
      const valueStr = value.toString();
      root.style.setProperty('--rows', valueStr);
      root.style.setProperty('--columns', valueStr);
    }

    function pushDivs(quantity = 16) {
      for (let i = 1; i <= quantity * quantity; i++) {
        const div = document.createElement('div');
        grid.append(div);
      }
    }
  }

  function setGridHeight() {
    function getElementsSize() {
      const headerHeight = header.getBoundingClientRect().height;
      const formHeight = form.getBoundingClientRect().height;
      const formMargin = getComputedStyle(root).getPropertyValue('--form-margin-bottom');
      return Math.ceil(headerHeight + formHeight + parseInt(formMargin));
    }
  
    function getClientHeight() {
      const docHeight = root.clientHeight;
      return docHeight - getElementsSize();
    }

    root.style.setProperty('--grid-height', getClientHeight() + 'px');
  }
}
