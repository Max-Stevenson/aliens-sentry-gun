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
