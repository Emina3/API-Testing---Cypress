/*
    Given
        https://reqres.in/api/users/3
    And
        {
            "email": "techpro@gmail.com",
            "first_name": "Tech",
            "last_name": "Pro",
            "avatar": "https://reqres.in/img/faces/4-image.jpg"
        }
    When
        User sends PUT Request to the URL
    Then
        Status code is 200
    And
        Response body should be like    {
                                            "email": "techpro@gmail.com",
                                            "first_name": "Tech",
                                            "last_name": "Pro",
                                            "avatar": "https://reqres.in/img/faces/4-image.jpg",
                                            "updatedAt": "2024-01-04T15:35:08.694Z"
                                        }
*/

describe("PUT Request method", () => {
  it("Should Update Existing Data", function () {
    // i) Set the url
    const pathParam1 = "/api";
    const pathParam2 = "/users";
    const pathParam3 = "/3";

    // ii) Set the payload
    cy.fixture("putRegresPayload").as("payload");
    cy.fixture("putRegresResponse").as("expectedData");

    // iii) Send the "PUT" request
    cy.get("@payload").then((payload) => {
      cy.get("@expectedData").then((expectedData) => {
        cy.request({
          method: "PUT",
          url: `${pathParam1}${pathParam2}${pathParam3}`,
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          // iv) Do Assertions

          const actualData = response.body;

          // i) Assert that status code is 200
          expect(response.status).to.eq(200);

          // ii) Assert that  "email" is "techpro@gmail.com"
          expect(actualData.email).to.eq(expectedData.email);

          // iiI) Assert that  "first_name" is "Tech"
          expect(actualData.first_name).to.eq(expectedData.first_name);

          // iv) Assert that "last_name" is "Pro"
          expect(actualData.last_name).to.eq(expectedData.last_name);

          // v) Assert that "avatar" is "https://reqres.in/img/faces/4-image.jpg"
          expect(actualData.avatar).to.eq(expectedData.avatar);

          // vi) Assert that "updatedAt" exist
          expect(actualData).to.have.property("updatedAt");
        });
      });
    });
  });
});
