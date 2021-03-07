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

const handleNavigation = function () {
  let currentOuterIndex = 0;
  const maxOuterIndex =
    document.querySelectorAll(".console__settings-container").length - 1;
  let currentSettingElement;
  let outerSelectionActive = true;
  let maxInnerIndex;
  let currentInnerIndex = 0;
  renderActiveSetting(currentOuterIndex);

  document.onkeydown = checkKey;

  function checkKey(e) {
    let innerOptions;
    let currentInnerIndex = 0;
    let maxInnerIndex;

    switch (e.key) {
      case "ArrowLeft":
        // Left pressed
        if (outerSelectionActive) {
          currentOuterIndex--;
          if (currentOuterIndex < 0) {
            currentOuterIndex = 0;
          }
          renderActiveSetting(currentOuterIndex);
        }
        break;
      case "ArrowRight":
        if (outerSelectionActive) {
          currentOuterIndex++;
          if (currentOuterIndex > maxOuterIndex) {
            currentOuterIndex = maxOuterIndex;
          }
          renderActiveSetting(currentOuterIndex);
        }
        break;
      case "ArrowUp":
        // Up pressed
        if (!outerSelectionActive) {
          currentInnerIndex--;
          if (currentInnerIndex < 0) {
            currentInnerIndex = 0;
          }
          innerOptions = currentSettingElement.parentElement.lastElementChild.children;
          innerOptions[currentInnerIndex].classList.toggle(
            "settings-container__option--active"
          );
        }
        break;
      case "ArrowDown": // Down pressed
        
        if (!outerSelectionActive) {
          currentInnerIndex++;
          if (currentInnerIndex > maxInnerIndex) {
            currentInnerIndex = maxInnerIndex;
          }
          innerOptions = currentSettingElement.parentElement.lastElementChild.children;
          innerOptions[currentInnerIndex].classList.toggle(
            "settings-container__option--active"
          );
        }

        break;
      case "Enter":
        if (outerSelectionActive) {
          outerSelectionActive = false;
          currentSettingElement = document.querySelector(
            ".settings-container__top-section--active"
          );
          maxInnerIndex = currentSettingElement.parentElement.lastElementChild.childElementCount - 1;
          selectSettingBlock(currentOuterIndex);
        } else {

        }
        break;
    }
  }
};

handleNavigation();

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
};

/*
  make checkKey generic to navigate outer option and inner option
  have a move outer option
  keep track of outer with isOuterSelection
  enter key moves to internal selection function, second enter key moves back out to outer + esc key?

*/
