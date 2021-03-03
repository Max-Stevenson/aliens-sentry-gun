const navigateOptions = function () {
  let startElement = document.querySelector('.settings-container__top-section--active').parentElement;

  document.onkeydown = checkKey;

  function checkKey(e) {
    console.log(e);
    e = e || window.event;

    if (e.keyCode === 38) {
        // up arrow
    }
    else if (e.keyCode === 40) {
        // down arrow
    }
    else if (e.keyCode === 37) {
       // left arrow
    }
    else if (e.keyCode === 39) {
       // right arrow
       console.log(startElement.nextElementSibling);
      startElement.nextElementSibling.classList.toggle('settings-container__top-section--active');
    }
  }
}

navigateOptions();