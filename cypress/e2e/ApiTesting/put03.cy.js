/*
    Given
        https://dummy.restapiexample.com/api/v1/update/21
    And
        {
            "employee_name": "Tom Hanks",
            "employee_salary": 111111,
            "employee_age": 23,
            "profile_image": "Perfect image"
        }
    When
        User sends PUT Request to the URL
    Then
        Status code is 200
    And
        Response body should be like    {
                                            "status": "success",
                                            "data": {
                                                "employee_name": "Tom Hanks",
                                                "employee_salary": 111111,
                                                "employee_age": 23,
                                                "profile_image": "Perfect image"
                                            },
                                            "message": "Successfully! Record has been updated."
                                        }
*/

describe("PUT Request method", () => {
  it("Should Update Existing Data", function () {
    // i) Set the url
    const pathParam1 = "/api";
    const pathParam2 = "/v1";
    const pathParam3 = "/update";
    const pathParam4 = "/21";

    // ii) Set the payload
    cy.fixture("putDummyPayload").as("payload");
    cy.fixture("putDummyResponse").as("expectedData");

    // iii) Send the "PUT" request
    cy.get("@payload").then((payload) => {
      cy.get("@expectedData").then((expectedData) => {
        cy.request({
          method: "PUT",
          url: `${pathParam1}${pathParam2}${pathParam3}${pathParam4}`,
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          // iv) Do Assertions

          const actualData = response.body;

          // i) Assert that status code is 200
          expect(response.status).to.eq(200);

          // ii) Assert that "status" is "success"
          expect(actualData.status).to.eq(expectedData.status);

          // iii) Assert  that "message" is "message"
          expect(actualData.message).to.eq(expectedData.message);

          // iv) Assert  that "employee_name" is "Tom Hanks"
          expect(actualData.data.employee_name).to.eq(
            expectedData.data.employee_name
          );

          // v) Assert  that "employee_salary" is "111111"
          expect(actualData.data.employee_salary).to.eq(
            expectedData.data.employee_salary
          );

          // vi) Assert  that "employee_age" is "23"
          expect(actualData.data.employee_age).to.eq(
            expectedData.data.employee_age
          );

          // vii) Assert  that "profile_image" is "Perfect image"
          expect(actualData.data.profile_image).to.eq(
            expectedData.data.profile_image
          );
        });
      });
    });
  });
});
