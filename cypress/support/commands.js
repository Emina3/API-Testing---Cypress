// Define an object to store errors for each 'it' block title globally
let itBlockErrors = {};
// Keep track of the total number of assertion failures for each "describe" block
let totalFailedAssertionsByDescribe = {};

Cypress.Commands.add(
  "softAssert",
  { prevSubject: false },
  (actualValue, expectedValue, message, assertType = "equal") => {
    return cy
      .wrap(null, { timeout: Cypress.config("defaultCommandTimeout") })
      .then(() => {
        try {
          switch (assertType) {
            case "equal":
              expect(actualValue).to.equal(expectedValue, message);
              break;
            case "lessThan":
              expect(actualValue).to.be.lessThan(expectedValue, message);
              break;
            case "greaterThan":
              expect(actualValue).to.be.greaterThan(expectedValue, message);
              break;
            case "include":
              expect(actualValue).to.include(expectedValue, message);
              break;
            // Add more cases as needed
            default:
              throw new Error(`Unsupported assertion type: ${assertType}`);
          }
        } catch (err) {
          const itBlockTitle = Cypress.currentTest.title;
          const describeBlockTitle = Cypress.currentTest.titlePath[0];

          // Initialize the count for the "describe" block if it doesn't exist
          totalFailedAssertionsByDescribe[describeBlockTitle] =
            totalFailedAssertionsByDescribe[describeBlockTitle] || 0;
          totalFailedAssertionsByDescribe[describeBlockTitle]++;

          if (!itBlockErrors[itBlockTitle]) {
            itBlockErrors[itBlockTitle] = [];
          }
          itBlockErrors[itBlockTitle].push({ message, error: err });
        }
      });
  }
);

Cypress.Commands.add("assertAll", () => {
  const errors = itBlockErrors;
  itBlockErrors = {};

  if (Object.keys(errors).length > 0) {
    const errorMessages = Object.entries(errors).map(
      ([title, entries], index) => {
        const errorMessage = entries
          .map(({ error }) => `=> ${error.message}`)
          .join("\n\n");

        return `${index + 1}. Test Title: ${title}\n${errorMessage}`;
      }
    );

    const errorMessage = Object.entries(totalFailedAssertionsByDescribe)
      .map(([describe, count]) => {
        return `Total assertion failures in "${describe}": ${count}`;
      })
      .join("\n");

    throw new Error(
      `Soft assertion failed: Total it block failed (${
        Object.keys(errors).length
      })\n${errorMessages.join("\n")}\n\n${errorMessage}`
    );
  }
});