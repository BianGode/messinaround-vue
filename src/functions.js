const checkSideBarFun = () => {
  const sideBar = document.querySelector(".sideBar");
  const backDrop = document.querySelector(".backDrop");
  if (sideBar.classList.contains("on")) {
    sideBar.classList.remove("on");
    sideBar.classList.add("off");
    backDrop.classList.toggle("on");
  }
};


export { checkSideBarFun }
