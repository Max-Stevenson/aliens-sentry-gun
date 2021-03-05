let currentIndex = 0;

const navigateOptions = function () {
  document.onkeydown = checkKey;

  function checkKey(e) {
    switch (e.key) {
      case "ArrowLeft":
        // Left pressed
        break;
      case "ArrowRight":
        // Right pressed
        currentIndex++;
        renderActiveSetting(currentIndex);
        break;
      case "ArrowUp":
        // Up pressed
        break;
      case "ArrowDown":
        // Down pressed
        break;
    }
  }
};

navigateOptions();

const renderActiveSetting = (index) => {
  const outerSettings = document.querySelectorAll(
    ".console__settings-container"
  );
  let currentSettingElement = outerSettings[index];
  let previousSettingElement = document.querySelector(
    ".settings-container__top-section--active"
  );
  if (previousSettingElement) {
    previousSettingElement.classList.toggle(
      "settings-container__top-section--active"
    );
  }
  currentSettingElement.firstElementChild.classList.toggle(
    "settings-container__top-section--active"
  );
};

renderActiveSetting(currentIndex);
/*
  make checkKey generic to navigate outer option and inner option
  have a move outer option
  keep track of outer with isOuterSelection
  enter key moves to internal selection function, second enter key moves back out to outer + esc key?

*/
