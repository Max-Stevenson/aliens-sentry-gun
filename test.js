const handleFiring = () => {
  const statusBar = document.querySelector("#temperature-gauge .status-bar__inner-bar");
  const statusBarParent = statusBar.parentElement;
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      const previousHeightPercentage = Math.floor(
        (Number(statusBar.offsetHeight) / Number(statusBarParent.offsetHeight)) * 100
      );
      statusBar.style.height = `${
        previousHeightPercentage + 3 > 100 ? 100 : previousHeightPercentage + 3
      }%`;
    }
  });
  setInterval(() => {
    if (statusBar.offsetHeight !== 0) {
      const previousHeightPercentage = Math.floor(
        (Number(statusBar.offsetHeight) / Number(statusBarParent.offsetHeight)) * 100
      );
      statusBar.style.height = `${
        previousHeightPercentage - 3 < 0 ? 0 : previousHeightPercentage - 3
      }%`;
    }
  }, 500);
};
handleFiring();

let timeout, interval;

[].forEach.call(document.querySelectorAll(".add"), function (button) {
  button.addEventListener("mousedown", function () {
    const id = button.dataset.target;
    incrementValue(id);

    timeout = setTimeout(function () {
      interval = setInterval(function () {
        incrementValue(id);
      }, 50);
    }, 300);
  });
});

function incrementValue (id) {
  const el = document.getElementById(id);
  let value = parseInt(el.textContent, 10);
  document.getElementById(id).textContent = --value;
}

function clearTimers (timeout, interval) {
  clearTimeout(timeout);
  clearInterval(interval);
}
