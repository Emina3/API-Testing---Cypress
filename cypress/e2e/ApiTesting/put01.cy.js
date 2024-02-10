/*
    Given
        https://jsonplaceholder.typicode.com/todos/198
    And
        {
            "userId": 21,
            "title": "Wash the dishes",
            "completed": false
        }
    When
        I send PUT Request to the Url
    Then
        Status code is 200
    And
        And response body is like   {
                                        "userId": 21,
                                        "title": "Wash the dishes",
                                        "completed": false
                                    }
    */

describe("PUT Request method", () => {
  it("should update existing data", function () {
    // i) Set the url
    const pathParam1 = "/todos";
    const pathParam2 = "/198";

    // ii) Set the payload
    cy.fixture("putTodosPayload").as("payload");

    // iii) Send the "PUT" request
    cy.get("@payload").then((payload)=>{
      cy.request({
        method: "PUT",
        url: `${pathParam1}${pathParam2}`,
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        // iv) Do Assertions

        const actualData = response.body;

        // i) Assert that status code is 200
        expect(response.status).to.eq(200);

        // ii) Assert that "userId" is 21
        expect(actualData.userId).to.eq(payload.userId);

        // iii) Assert that "title" is "Wash the dishes"
        expect(actualData.title).to.eq(payload.title);

        // iv) Assert that "completed" is "false"
        expect(actualData.completed).to.eq(payload.completed);
      });
    });
  });
});
