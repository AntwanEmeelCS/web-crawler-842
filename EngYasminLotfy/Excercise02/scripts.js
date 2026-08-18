import localStorageWorker from "./localStorageWorker.js";

let btnSet = document.getElementById("btnSetItemValue");
let txtSetVariable = document.getElementById("itemNameSet");
let txtSetContent = document.getElementById("itemValueSet");
let chkAllowOverwrite = document.getElementById("allowOverwrite");

btnSet.addEventListener("click", function (e) {
  if (txtSetVariable.value.trim().length == 0) {
    alert("Enter vriable Name Before setting");
  } else if (txtSetContent.value.trim().length == 0) {
    alert("write value before setting");
  } else {
    localStorageWorker.addVariable(
      txtSetVariable.value,
      txtSetContent.value,
      chkAllowOverwrite.checked,
    );
    alert(`Check console for result`);
  }
  e.preventDefault();
  e.stopPropagation();
});

let btnGet = document.getElementById("btnReadItemValue");
let txtGetVariable = document.getElementById("itemNameRead");

btnGet.addEventListener("click", function (e) {
  let qString = txtGetVariable.value;
  if (qString.trim().length == 0) {
    alert("please enter variable name");
  } else {
    let content = localStorageWorker.getVariableContent(qString);
    if (content === null) {
      alert(`Variable ${qString} does NOT Exist`);
    } else {
      let pRes = document.getElementById("itemValue");
      pRes.innerHTML = content;
      alert("success read");
    }
  }
  e.preventDefault();
  e.stopPropagation();
});
