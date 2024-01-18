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

const toggleShoppingCart = () => {
  const shoppingcartEl = document.querySelector('.shoppingCart')
  shoppingcartEl.classList.toggle('on')
  shoppingcartEl.classList.toggle('off')
}

const shortMessageChange = (mes) => {
  let shortMessage = document.querySelector('.shortMessage');
  let message = document.querySelector('.message')
  closeSidebar();
  shortMessage.classList.add('on')
  shortMessage.classList.remove('off')
  message.textContent = mes
  setTimeout(() => {
    shortMessage.classList.remove('on')
    shortMessage.classList.add('off')
  }, 2000)
}

const closeSidebar = () => {
  const sideBar = document.querySelector('.sideBar')
  const backDrop = document.querySelector('.backDrop')

  sideBar.classList.toggle('on')
  sideBar.classList.toggle('off')
  backDrop.classList.toggle('on')
}

export { checkSideBarFun, calculatePrice, toggleShoppingCart, shortMessageChange, closeSidebar }