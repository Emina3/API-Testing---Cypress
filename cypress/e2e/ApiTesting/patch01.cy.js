/*
    Given
        https://jsonplaceholder.typicode.com/todos/198
    And
            {
                "title": "Wash the dishes"
            }
    When
        User sends PATCH Request to the Url
    Then
        Status code is 200
    And
        And response body is like   {
                                        "userId": 10,
                                        "title": "Wash the dishes",
                                        "completed": true,
                                        "id": 198
                                    }
*/
describe("PATCH request method", () => {
  it("should update the existing  data partially", function () {
    //Set the  url
    const pathparam1 = "/todos";
    const pathparam2 = "/198";
    //set the payload
    cy.fixture("patchTodosPayload").as("payload");
    cy.fixture("patchTodosResponse").as("expectedData");
    //Send the patch request
    cy.get("@payload").then((payload) => {
      cy.get("@expectedData").then((expectedData) => {
        cy.request({
          method: "PATCH",
          url: `${pathparam1}${pathparam2}`,
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          //Do Assertions
          const actualData = response.body;
          //Assert that Status code is 200
          expect(response.status).to.eq(200);
          //Assert that "userId" is   10,
          expect(actualData.userId).to.eq(expectedData.userId);
          //Assert that  "title" is   "Wash the dishes",
          expect(actualData.title).to.eq(expectedData.title);
          //Assert that  "completed" is   true,
          expect(actualData.completed).to.eq(expectedData.completed);
          //Assert that  "id" exists and its value is  198
          expect(actualData.id).to.eq(expectedData.id);
        });
      });
    });
  });
});
