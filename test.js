const handleFiring = () => {
  const statusBar = document.querySelector(".status-bar__inner");
  const statusBarParent = statusBar.parentElement;
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      const previousHeightPercentage = Number(statusBar.offsetHeight) / Number(statusBarParent.offsetHeight) * 100;
      console.log(previousHeightPercentage);
      statusBar.style.height = `${previousHeightPercentage + 2}%`;
    }
  });
};

handleFiring();
