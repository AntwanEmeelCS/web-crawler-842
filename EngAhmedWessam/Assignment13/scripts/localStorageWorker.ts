export default class localStorageWorker {
  static variableExists(variableName: string): boolean {
    let result = localStorage.getItem(variableName);
    return !(result === null);
  }
  static addUpdateVariable(
    variableName: string,
    variableContent: any,
    allowOverwrite: boolean,
  ): void {
    if (allowOverwrite || !this.variableExists(variableName)) {
      if (allowOverwrite) {
        console.log(`Variable ${variableName} Overwritten!`);
      }
      if (!this.variableExists(variableName)) {
        console.log(`Variable ${variableName} Inserted!`);
      }
      localStorage.setItem(variableName, JSON.stringify(variableContent));
    } else {
      console.log(
        `Variable ${variableName} already exists while overwrite is not allowed!`,
      );
    }
  }
  static getVariableContent(variableName: string) {
    let content = JSON.parse(localStorage.getItem(variableName) ?? "");
    if (content === null) {
      console.log(`Variable ${variableName} does NOT exist!`);
    }
    return content;
  }
}
