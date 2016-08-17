import "reflect-metadata";
import { TESTS_KEY } from "./_metadata-keys";

export function AsyncTest(description?: string) {
   return  (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any/*Promise<void>*/>) => {

      // check if this has been registered as a test already
      let tests: Array<any> = Reflect.getMetadata(TESTS_KEY, target);

      // if there are no tests registered yet then register it
      if (!tests) {
         tests = [ {
            key: propertyKey
         } ];
      }
      // otherwise add it to the register if it's not already there
      else if (tests.filter(test => test.key === propertyKey).length === 0) {
         tests.push( {
            key: propertyKey
         } );
      }

      // mark it as async and add the description
      let test = tests.filter(test => test.key === propertyKey)[0];
      test.isAsync = true;
      test.description = description;

      // update the register
      Reflect.defineMetadata(TESTS_KEY, tests, target);
   };
}
