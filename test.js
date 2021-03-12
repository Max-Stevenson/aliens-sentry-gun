const handleFiring = () => {
  const statusBar = document.querySelector(".status-bar__inner");
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
      statusBar.style.height += "5%";
    }
  });
};

handleFiring();
