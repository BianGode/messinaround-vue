const checkSideBarFun = () => {
  const sideBar = document.querySelector(".sideBar");
  const backDrop = document.querySelector(".backDrop");
  if (sideBar.classList.contains("on")) {
    sideBar.classList.remove("on");
    sideBar.classList.add("off");
    backDrop.classList.toggle("on");
  }
};

// function to calculate full price
const calculatePrice = (arr) => {
    let fullPrice = 0

    for(let i; i < arr.length; i++) {
      fullPrice += arr[i]
    }
    return fullPrice;
}


export { checkSideBarFun, calculatePrice }
