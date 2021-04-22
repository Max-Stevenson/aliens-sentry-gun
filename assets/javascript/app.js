const isSelectionScreen = true;
const isFiringScreen = false;

if (isSelectionScreen) {
  // render selection console
}

if (isFiringScreen) {
  // render firing console
}

const playNavigationSound = () => {
  const audio = new Audio("./assets/selection.mp3");
  audio.play();
};

const playSelectionSound = () => {};

const handleNavigation = function () {
  let currentOuterIndex = 0;
  const maxOuterIndex = document.querySelectorAll(".console__settings-container").length - 1;
  let currentSettingElement;
  let outerSelectionActive = true;
  let maxInnerIndex;
  let previousOption;
  let currentInnerIndex = 0;
  let innerOptions;
  let selectedSettings;

  const renderActiveSetting = (index) => {
    const outerSettings = document.querySelectorAll(".console__settings-container");
    const currentSettingElement = outerSettings[index];
    const previousSettingElement = document.querySelector(".settings-container__top-section--active");
    if (previousSettingElement) {
      previousSettingElement.classList.toggle("settings-container__top-section--active");
    }
    currentSettingElement.firstElementChild.classList.toggle(
      "settings-container__top-section--active"
    );
  };
  renderActiveSetting(currentOuterIndex);

  const renderActiveInner = (currentInnerIndex) => {
    innerOptions = currentSettingElement.parentElement.lastElementChild.children;
    previousOption = currentSettingElement.parentElement.lastElementChild.querySelector(
      ".settings-container__option--active"
    );
    previousOption.classList.toggle("settings-container__option--active");
    innerOptions[currentInnerIndex].classList.toggle("settings-container__option--active");
  };

  const selectSettingBlock = function (index) {
    const outerSettings = document.querySelectorAll(".console__settings-container");
    const currentSettingElement = outerSettings[index];
    currentSettingElement.firstElementChild.classList.toggle(
      "settings-container__top-section--active"
    );
    if (currentSettingElement.lastElementChild.querySelector(".settings-container__option--active")) {
      const child = currentSettingElement.lastElementChild.querySelector(".settings-container__option--active");
      const parent = child.parentNode;
      currentInnerIndex = Array.prototype.indexOf.call(parent.children, child);
    } else {
      currentSettingElement.lastElementChild.firstElementChild.classList.toggle(
        "settings-container__option--active"
      );
    }
  };

  const resetSettings = () => {
    selectedSettings = document.querySelectorAll(".settings-container__option--active");
    if (selectedSettings) {
      for (let i = 0, j = selectedSettings.length; i < j; i++) {
        selectedSettings[i].classList.toggle("settings-container__option--active");
      }
    }

    const currentActive = document.querySelector(".settings-container__top-section--active");
    if (currentActive) {
      document
        .querySelector(".settings-container__top-section--active")
        .classList.toggle("settings-container__top-section--active");
    }
    renderActiveSetting(0);
  };

  document.onkeydown = checkKey;
  function checkKey (e) {
    switch (e.key) {
      case "ArrowLeft":
        // Left pressed
        if (outerSelectionActive) {
          currentOuterIndex--;
          playNavigationSound();
          if (currentOuterIndex < 0) {
            currentOuterIndex = 0;
          }
          renderActiveSetting(currentOuterIndex);
        }
        break;
      case "ArrowRight":
        if (outerSelectionActive) {
          currentOuterIndex++;
          playNavigationSound();
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
          renderActiveInner(currentInnerIndex);
        }
        break;
      case "ArrowDown": // Down pressed
        if (!outerSelectionActive) {
          currentInnerIndex++;
          if (currentInnerIndex > maxInnerIndex) {
            currentInnerIndex = maxInnerIndex;
          }
          renderActiveInner(currentInnerIndex);
        }

        break;
      case "Enter":
        if (outerSelectionActive) {
          outerSelectionActive = false;
          currentSettingElement = document.querySelector(
            ".settings-container__top-section--active"
          );
          maxInnerIndex =
            currentSettingElement.parentElement.lastElementChild.childElementCount - 1;
          selectSettingBlock(currentOuterIndex);
        } else {
          outerSelectionActive = true;
          currentInnerIndex = 0;
          currentSettingElement.classList.toggle("settings-container__top-section--active");
          playSelectionSound();
        }
        break;
      case "Escape":
        currentOuterIndex = 0;
        currentInnerIndex = 0;
        outerSelectionActive = true;
        resetSettings();
    }
  }
};

handleNavigation();

document.querySelector("#criticalWarning").addEventListener("click", function () {
  const warningOuter = this;
  const warningInner = warningOuter.firstElementChild;

  warningOuter.classList.toggle("critical-warning__container--non-inverted");
  warningInner.classList.toggle("critical-warning__content--non-inverted");
  warningInner.classList.toggle("critical-warning-inverted");
});
