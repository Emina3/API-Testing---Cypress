/*
    Given
        https://jsonplaceholder.typicode.com/todos
    And
        {
            "userId": 55,
            "title": "Tidy your room",
            "completed": false
        }
    When
        I send POST Request to the Url
    Then
        Status code is 201
    And
        response body is like   {
                                    "userId": 55,
                                    "title": "Tidy your room",
                                    "completed": false,
                                    "id": 201
                                }
    */

describe("POST Request method", () => {
  it("should create new data", function () {
    // i) Set the url
    const pathParam = "/todos";

    // ii)Set the payload
    cy.fixture("postTodosPayload").as("payload");

    // iii) Send the "POST" request
    cy.get("@payload").then((payload) => {
      cy.request({
        method: "POST",
        url: `${pathParam}`,
        body: payload,
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response)=>{
        // iv)Do Assertions
        const actualData = response.body;

        // 1) Assert that Status code is 201
        expect(response.status).to.eq(201);

        // 2) Assert that userId is 55
         expect(actualData.userId).to.eq(payload.userId);

        // 3) Assert that title  is "Tidy your room"
        expect(actualData.title).to.eq(payload.title);

        // 4) Assert that completed  is false
        expect(actualData.completed).to.eq(payload.completed);
      });
    });
  });
});
