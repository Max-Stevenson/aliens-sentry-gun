import Decimal from "./decimal.mjs";

const switchDisplays = () => {
  const settingsConsole = document.querySelector("#settingsConsole");
  const firingConsole = document.querySelector("#firingConsole");

  settingsConsole.classList.toggle("hidden");
  firingConsole.classList.toggle("hidden");
};

const setupConfirmButtonHandler = () => {
  const confirmBtn = document.querySelector("#settingsConfirmButton");
  confirmBtn.addEventListener("click", () => {
    switchDisplays();
    confirmBtn.blur();
  });
};

const playNavigationSound = () => {
  const audio = new Audio("./assets/sounds/selection.mp3");
  audio.play();
};

const playFiringSound = () => {
  const audio = new Audio("./assets/sounds/firing.mp3");
  audio.play();
};

const disableConfirmationButton = () => {
  document.querySelector("#settingsConfirmButton").disabled = true;
};

const enableConfirmationButton = () => {
  document.querySelector("#settingsConfirmButton").disabled = false;
};

const checkAllSettingsSelected = () => {
  return document.querySelectorAll(".settings-container__option--active").length === 7;
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
    const previousSettingElement = document.querySelector(
      ".settings-container__top-section--active"
    );
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
    if (
      currentSettingElement.lastElementChild.querySelector(".settings-container__option--active")
    ) {
      const child = currentSettingElement.lastElementChild.querySelector(
        ".settings-container__option--active"
      );
      const parent = child.parentNode;
      currentInnerIndex = Array.prototype.indexOf.call(parent.children, child);
    } else {
      currentSettingElement.lastElementChild.firstElementChild.classList.toggle(
        "settings-container__option--active"
      );
    }
  };

  const resetSettings = () => {
    disableConfirmationButton();
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
          if (currentOuterIndex < 0) {
            currentOuterIndex = 0;
            renderActiveSetting(currentOuterIndex);
          } else {
            playNavigationSound();
            renderActiveSetting(currentOuterIndex);
          }
        }
        break;
      case "ArrowRight":
        if (outerSelectionActive) {
          currentOuterIndex++;
          if (currentOuterIndex > maxOuterIndex) {
            currentOuterIndex = maxOuterIndex;
            renderActiveSetting(currentOuterIndex);
          } else {
            playNavigationSound();
            renderActiveSetting(currentOuterIndex);
          }
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
          if (checkAllSettingsSelected()) {
            enableConfirmationButton();
          }
        }
        break;
      case "Escape":
        currentOuterIndex = 0;
        currentInnerIndex = 0;
        outerSelectionActive = true;
        resetSettings();
        break;
      case " ":
        handleFiring();
        break;
    }
  }
};

handleNavigation();
setupConfirmButtonHandler();

const activateCriticalWarning = () => {
  const criticalWarningOuter = document.querySelector("#criticalWarning");
  const criticalWarningInner = criticalWarningOuter.firstElementChild;

  const ammoCount = parseInt(document.querySelector("#firing-section__ammo-counter").textContent);

  if (ammoCount < 470 && ammoCount > 0) {
    criticalWarningOuter.classList.add("critical-warning--active");
    setInterval(() => {
      criticalWarningOuter.classList.toggle("critical-warning__container--non-inverted");
      criticalWarningInner.classList.toggle("critical-warning__content--non-inverted");
      criticalWarningInner.classList.toggle("critical-warning-inverted");
    }, 1000);
  }
};

const renderCopyright = () => {
  document.querySelector(
    "#copyright"
  ).innerHTML = `Copyright&#169 ${new Date().getFullYear()} Max Stevenson`;
};

renderCopyright();

function decreaseAmmoCounter () {
  const ammoCounter = document.querySelector("#firing-section__ammo-counter");
  const temperatureStatusBar = document.querySelector("#temperature-gauge .status-bar__inner-bar");
  const tempValue = parseInt(temperatureStatusBar.style.height);
  let ammoValue = parseInt(ammoCounter.textContent, 10);
  if (ammoValue > 0 && tempValue < 100) {
    ammoCounter.textContent = --ammoValue;
  }
}

const initTimeAt = () => {
  const timeAtElement = document.querySelector("#firing-section__time-counter");
  if (timeAtElement.textContent === "00.00") {
    timeAtElement.textContent = "33.00";
  }
  timeAtElement.style.color = "#838208";
};

const setTimeAtToZero = () => {
  const timeAtElement = document.querySelector("#firing-section__time-counter");
  timeAtElement.textContent = "00.00";
};

const decreaseTimeAtToZero = () => {
  const timeAtElement = document.querySelector("#firing-section__time-counter");
  const ammoCounter = document.querySelector("#firing-section__ammo-counter");
  const temperatureStatusBar = document.querySelector("#temperature-gauge .status-bar__inner-bar");
  const tempValue = parseInt(temperatureStatusBar.style.height);
  const ammoValue = parseInt(ammoCounter.textContent, 10);
  let timeValue = new Decimal(timeAtElement.textContent);
  if (ammoValue > 0 && tempValue < 100 && timeValue > 0) {
    timeValue = timeValue.sub(0.13).toFixed(2);
    timeAtElement.textContent = timeValue;
  }
};

const handleFiring = () => {
  playFiringSound();
  initTimeAt();
  decreaseAmmoCounter();
  decreaseTimeAtToZero();
  // negative if
  if (!document.querySelector("#criticalWarning").classList.contains("critical-warning--active")) {
    activateCriticalWarning();
  };
  const temperatureStatusBar = document.querySelector("#temperature-gauge .status-bar__inner-bar");
  const temperatureStatusBarParent = temperatureStatusBar.parentElement;

  const previousHeightPercentage = Math.floor(
    (Number(temperatureStatusBar.offsetHeight) / Number(temperatureStatusBarParent.offsetHeight)) * 100
  );
  temperatureStatusBar.style.height = `${
    previousHeightPercentage + 3 > 100 ? 100 : previousHeightPercentage + 3
  }%`;
};

let running = false;
document.onkeyup = test;
function test (e) {
  if (e.key === " " && !running) {
    running = true;
    const interval = setInterval(() => {
      const temperatureStatusBar = document.querySelector("#temperature-gauge .status-bar__inner-bar");
      const temperatureStatusBarParent = temperatureStatusBar.parentElement;

      if (temperatureStatusBar.offsetHeight !== 0) {
        const previousHeightPercentage = Math.floor(
          (Number(temperatureStatusBar.offsetHeight) / Number(temperatureStatusBarParent.offsetHeight)) * 100
        );
        temperatureStatusBar.style.height = `${
          previousHeightPercentage - 2 < 0 ? 0 : previousHeightPercentage - 2
        }%`;
      } else {
        setTimeAtToZero();
        running = false;
        clearInterval(interval);
      }
    }, 1000);
  }
};
