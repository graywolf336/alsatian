import { AlsatianError } from "../../core/_errors";

export class InvalidArgumentNamesError extends AlsatianError {

   public constructor(argumentNames:  Array<string>) {
      super();

      if (argumentNames.length === 1) {
         this.message = `unrecognised argument "${argumentNames[0].replace(/[-]*/, "")}".`;
      }
      else {
         this.message = `unrecognised arguments ${argumentNames.map(argument => `"${argument.replace(/[-]*/, "")}"`).join(" and ")}.`;
      }
   }
}
