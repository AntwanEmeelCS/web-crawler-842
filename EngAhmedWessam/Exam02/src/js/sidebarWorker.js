import router from "./router.js";
export default class sidebarWorker {
  static activateSidebarFunctionality() {
    let sideBarItems = document.querySelectorAll("#sidebar nav .mb-6 ul li");
    let sideBarItemArray = Array.from(sideBarItems);
    for (let index = 0; index < sideBarItemArray.length; index++) {
      const element = sideBarItemArray[index];
      element.addEventListener("click", function (e) {
        router.routeToAppPage(element.innerText);
        e.stopPropagation();
      });
    }
  }
}
