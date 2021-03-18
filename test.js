const handleFiring = () => {
  const statusBar = document.querySelector(".temperature-reading__status-bar .status-bar__inner");
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
      console.log("meow");
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
