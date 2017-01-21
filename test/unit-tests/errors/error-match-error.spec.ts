import { Expect, Test, TestCase } from "../../../core/alsatian-core";
import { ErrorMatchError } from "../../../core/errors/error-match-error";

export class ErrorMatchErrorTests {

   @Test()
   public noActualErrorShouldGiveCorrectMessage() {
      let error = new ErrorMatchError(null, true);

      Expect(error.message).toBe("Expected an error to be thrown but no errors were thown.");
   }

   @Test()
   public actualErrorThrownWhenNoneExpectedShouldGiveCorrectMessage() {
      let error = new ErrorMatchError(new Error(), false);

      Expect(error.message).toBe("Expected an error not to be thrown but an error was thown.");
   }

   @TestCase(Error, EvalError)
   @TestCase(Error, ReferenceError)
   @TestCase(Error, SyntaxError)
   @TestCase(Error, TypeError)
   @TestCase(Error, URIError)
   @TestCase(ReferenceError, EvalError)
   @TestCase(ReferenceError, SyntaxError)
   @TestCase(ReferenceError, TypeError)
   @TestCase(ReferenceError, URIError)
   @TestCase(SyntaxError, EvalError)
   @TestCase(SyntaxError, ReferenceError)
   @TestCase(SyntaxError, TypeError)
   @TestCase(SyntaxError, URIError)
   @TestCase(TypeError, EvalError)
   @TestCase(TypeError, ReferenceError)
   @TestCase(TypeError, SyntaxError)
   @TestCase(TypeError, URIError)
   @TestCase(URIError, EvalError)
   @TestCase(URIError, ReferenceError)
   @TestCase(URIError, TypeError)
   @TestCase(URIError, SyntaxError)
   public actualErrorIsNotCorrectTypeGivesCorrectMessage(
                                      actualErrorType: new () => Error,
                                      expectedErrorType: new () => Error) {

      let error = new ErrorMatchError(new actualErrorType(), true, expectedErrorType);

      Expect(error.message)
        .toBe(`Expected an error of type ${(<any> expectedErrorType).name} ` +
              `to have been thrown, but ${(<any> actualErrorType).name} was thrown instead.`);
   }

   @TestCase(EvalError)
   @TestCase(ReferenceError)
   @TestCase(SyntaxError)
   @TestCase(TypeError)
   @TestCase(URIError)
   public actualErrorIsMatchingTypeButShouldntBeGivesCorrectMessage(errorType: new () => Error) {
      let error = new ErrorMatchError(new errorType(), false, errorType);

      Expect(error.message)
        .toBe("Expected an error of type " + (<any> errorType).name + " to not have been thrown, but it was.");
   }

   @TestCase("something went wrong")
   @TestCase("A much worse thing happened!")
   @TestCase("THE END IS NIGH")
   public actualErrorHasIncorrectMessageGivesCorrectMessage(message: string) {
      let error = new ErrorMatchError(new Error(), true, null, message);

      Expect(error.message)
        .toBe("Expected an error with message \"" + message + "\" to have been thrown, but it wasn't.");
   }

   @TestCase("something went wrong")
   @TestCase("A much worse thing happened!")
   @TestCase("THE END IS NIGH")
   public actualErrorHasMatchingMessageButShouldntBeGivesCorrectMessage(message: string) {
      let error = new ErrorMatchError(new Error(message), false, null, message);

      Expect(error.message)
        .toBe("Expected an error with message \"" + message + "\" to not have been thrown, but it was.");
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public actualErrorHasIncorrectTypeAndMessageGivesCorrectMessage(
                                              expectedErrorType: new () => Error,
                                              message: string) {

      let error = new ErrorMatchError(new Error(), true, expectedErrorType, message);

      Expect(error.message)
        .toBe(`Expected an error with message "${message}" ` +
              `and type ${(<any> expectedErrorType).name} to have been thrown, but it wasn't.`);
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public actualErrorHasMatchingMessageAndTypeButShouldntBeGivesCorrectMessage(
                                                expectedErrorType: new (message: string) => Error,
                                                message: string) {

      let error = new ErrorMatchError(new expectedErrorType(message), false, expectedErrorType, message);

      Expect(error.message)
        .toBe(`Expected an error with message "${message} ` +
              `and type ${(<any> expectedErrorType).name} to not have been thrown, but it was.`);
   }

   @Test()
   public actualValueAndShouldMatchShouldBeSetToErrorWasNotThrown() {
      let error = new ErrorMatchError(undefined, true);

      Expect(error.actual).toBe("error was not thrown.");
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public actualValueAndShouldNotMatchShouldBeSetToErrorWasThrown(
                                              actualErrorType: new (message: string) => Error,
                                              actualErrorMessage: string) {

      let error = new ErrorMatchError(new actualErrorType(actualErrorMessage), false);

      Expect(error.actual)
        .toBe(`${(<any> actualErrorType).name} error was thrown with message "${actualErrorMessage}".`);
   }

   @Test()
   public expectedValueAndShouldMatchShouldBeSetToErrorToBeThrown() {
      let error = new ErrorMatchError(undefined, true);

      Expect(error.expected).toBe("error to be thrown.");
   }

   @Test()
   public expectedValueAndShouldNotMatchShouldBeSetToErrorNotToBeThrown() {
      let error = new ErrorMatchError(new Error(), false);

      Expect(error.expected).toBe("error not to be thrown.");
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public actualValueAndShouldMatchAndExpectedErrorShouldBeSetToErrorWasNotThrown(
                                            expectedErrorType: new (message: string) => Error,
                                            expectedErrorMessage: string) {

      let error = new ErrorMatchError(undefined, true, expectedErrorType, expectedErrorMessage);

      Expect(error.actual).toBe("error was not thrown.");
   }

   @TestCase(EvalError, "something went wrong", ReferenceError, "A much worse thing happened!")
   @TestCase(ReferenceError, "A much worse thing happened!", SyntaxError, "THE END IS NIGH")
   @TestCase(SyntaxError, "THE END IS NIGH", EvalError, "something went wrong")
   public actualValueAndShouldMatchAndExpectedErrorShouldBeSetToWrongErrorWasThrown(
                                              expectedErrorType: new (message: string) => Error,
                                              expectedErrorMessage: string,
                                              actualErrorType: new (message: string) => Error,
                                              actualErrorMessage: string) {

      let error = new ErrorMatchError(new actualErrorType(actualErrorMessage),
                                      true,
                                      expectedErrorType,
                                      expectedErrorMessage);

      Expect(error.actual)
        .toBe(`${(<any> actualErrorType).name} error was thrown with message "${actualErrorMessage}".`);
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public actualValueAndShouldNotMatchAndExpectedErrorShouldBeSetToWrongErrorWasThrown(
                                                expectedErrorType: new (message: string) => Error,
                                                expectedErrorMessage: string) {

      let error = new ErrorMatchError(new expectedErrorType(expectedErrorMessage),
                                      false,
                                      expectedErrorType,
                                      expectedErrorMessage);

      Expect(error.actual)
        .toBe(`${(<any> expectedErrorType).name} error was thrown with message "${expectedErrorMessage}".`);
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public expectedValueAndShouldMatchShouldBeSetToErrorShouldBeThrown(
                                          expectedErrorType: new (message: string) => Error,
                                          expectedErrorMessage: string) {

      let error = new ErrorMatchError(undefined, true, expectedErrorType, expectedErrorMessage);

      Expect(error.expected)
        .toBe(`${(<any> expectedErrorType).name} error to be thrown with message "${expectedErrorMessage}".`);
   }

   @TestCase(EvalError, "something went wrong")
   @TestCase(ReferenceError, "A much worse thing happened!")
   @TestCase(SyntaxError, "THE END IS NIGH")
   public expectedValueAndShouldNotMatchShouldBeSetToErrorShouldNotBeThrown(
                                                                expectedErrorType: new (message: string) => Error,
                                                                expectedErrorMessage: string) {

      let error = new ErrorMatchError(new expectedErrorType(expectedErrorMessage),
                                      false,
                                      expectedErrorType,
                                      expectedErrorMessage);

      Expect(error.expected)
        .toBe(`${(<any> expectedErrorType).name} error not to be thrown with message "${expectedErrorMessage}".`);
   }
}
