export default class localStorageWorker {
  static variableExists(variableName) {
    let result = localStorage.getItem(variableName);
    return !(result === null);
  }
  static addVariable(variableName, variableContent, allowOverwrite) {
    if (allowOverwrite || !this.variableExists(variableName)) {
      if (allowOverwrite) {
        console.log(`Variable ${variableName} Overwritten!`);
      }
      if (!this.variableExists(variableName)) {
        console.log(`Variable ${variableName} Inserted!`);
      }
      localStorage.setItem(variableName, variableContent);
    } else {
      console.log(
        `Variable ${variableName} already exists while overwrite is not allowed!`,
      );
    }
  }
  static getVariableContent(variableName) {
    let content = localStorage.getItem(variableName);
    if (content === null) {
      console.log(`Variable ${variableName} does NOT exist!`);
    }
    return content;
  }
}
