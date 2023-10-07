'use strict';

App();

function App() {
  const root = document.documentElement;
  const header = document.querySelector('#header');
  const form = document.querySelector('#form');
  const input = document.querySelector('#value-grid');
  const grid = document.querySelector('#grid');

  setGridHeight();
  setGrid();
  coloringDivs();

  function coloringDivs() {
    grid.addEventListener('mouseover', (event) => {
      const target = event.target;
      const divsAmount = grid.childElementCount;
      for (let i = 1; i <= divsAmount; i++) {
        if (target.id === `${i}`) {
          setOpacity(target);
          if (target.style.backgroundColor) return;
          randomizeColor(target);
        }
      }
    });

    function setOpacity(element) {
      const style = element.style;
      if (!style.opacity) style.opacity = '0.1';
      const opacityValue = parseFloat(getComputedStyle(element).opacity);
      if (opacityValue < 1) style.opacity = (opacityValue + 0.1).toString();
    }

    function randomizeColor(element) {
      const redColor = Math.round(Math.random() * 255);
      const greenColor = Math.round(Math.random() * 255);
      const blueColor = Math.round(Math.random() * 255);
      const rgb = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
      element.style.backgroundColor = rgb;
    }
  }

  function setGrid() {
    form.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id === 'btn-enter') createGrid();
      if (target.id === 'btn-clear') clearGrid();
    });

    function clearGrid() {
      const divs = grid.children;
      for (const div of divs) div.removeAttribute('style');
    }

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

    function pushDivs(quantity) {
      for (let i = 1; i <= quantity * quantity; i++) {
        const div = document.createElement('div');
        div.setAttribute('id', `${i}`);
        grid.append(div);
      }
    }
  }

  function setGridHeight() {
    root.style.setProperty('--grid-height', getClientHeight() + 'px');

    function getElementsSize() {
      const headerHeight = header.getBoundingClientRect().height;
      const formHeight = form.getBoundingClientRect().height;
      const formMargin = getComputedStyle(root).getPropertyValue('--form-margin-bottom');
      const gridMargin = getComputedStyle(root).getPropertyValue('--grid-margin-bottom');
      const result = Math.ceil(
        headerHeight + formHeight + parseInt(formMargin) + parseInt(gridMargin)
      );
      return result;
    }
  
    function getClientHeight() {
      const docHeight = root.clientHeight;
      const result = docHeight - getElementsSize();
      if (result >= 960) return 960;
      return result;
    }
  }
}
