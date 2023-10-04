'use strict';

App();

function App() {
  const root = document.documentElement;
  const header = document.querySelector('#header');
  const form = document.querySelector('#form');
  const grid = document.querySelector('#grid');

  setGridHeight();

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
