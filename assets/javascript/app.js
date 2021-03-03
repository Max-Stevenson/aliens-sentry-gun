const navigateOptions = function () {
  let startElement = document.querySelector('.settings-container__top-section--active').parentElement;

  document.onkeydown = checkKey;

  function checkKey(e) {

    switch (e.key) {
      case "ArrowLeft":
        // Left pressed
        break;
      case "ArrowRight":
        // Right pressed
        startElement.nextElementSibling.classList.toggle('settings-container__top-section--active');
        break;
      case "ArrowUp":
        // Up pressed
        break;
      case "ArrowDown":
        // Down pressed
        break;
    }
  }
}

navigateOptions();