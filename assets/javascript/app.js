let currentIndex = 0;
const maxIndex =
  document.querySelectorAll(".console__settings-container").length - 1;
let outerSelectionActive = true;

// const genericCheckKey()

const navigateOptions = function () {
  document.onkeydown = checkKey;

  function checkKey(e) {
    switch (e.key) {
      case "ArrowLeft":
        // Left pressed
        if (outerSelectionActive) {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = 0;
          }
          renderActiveSetting(currentIndex);
        }
        break;
      case "ArrowRight":
        if (outerSelectionActive) {
          currentIndex++;
          if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
          }
          renderActiveSetting(currentIndex);
        }
        break;
      case "Enter":
        if (outerSelectionActive) {
          outerSelectionActive = false;
          selectSettingBlock(currentIndex);
        } else {
          selectInnerSetting();
          outerSelectionActive = true;
        }
        break;
    }
  }
};

navigateOptions();

const selectSettingBlock = function (index) {
  const outerSettings = document.querySelectorAll(
    ".console__settings-container"
  );
  let currentSettingElement = outerSettings[index];
  currentSettingElement.firstElementChild.classList.toggle(
    "settings-container__top-section--active"
  );
  currentSettingElement.lastElementChild.firstElementChild.classList.toggle(
    "settings-container__option--active"
  );

  const renderInnerSetting = () => {};

  document.onkeydown = function (e) {
    const innerOptions = currentSettingElement.lastElementChild.children;
    const maxIndex = innerOptions.length - 1;
    let currentIndex = 0;
    let previousActive = currentSettingElement.lastElementChild.querySelector(
      ".settings-container__option--active"
    );

    switch (e.key) {
      case "ArrowUp":
        // Up pressed
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = 0;
        }
        previousActive.classList.toggle("settings-container__option--active");
        innerOptions[currentIndex].classList.toggle(
          "settings-container__option--active"
        );
        break;
      case "ArrowDown":
        // Down pressed
        currentIndex++;
        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }
        previousActive.classList.toggle("settings-container__option--active");
        innerOptions[currentIndex].classList.toggle(
          "settings-container__option--active"
        );
        break;
    }
  };
};

const selectInnerSetting = function () {};

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
