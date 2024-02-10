/*
    Given
        https://dummy.restapiexample.com/api/v1/delete/2
    When
        User sends DELETE Request to the Url
    Then
        Status code is 200
    And 
        Response body is {
                            "status": "success",
                            "data": "2",
                            "message": "Successfully! Record has been deleted"
                        }
*/

describe("DELETE  request method", () => {
  it("should  delete an existing data", () => {
    //Set the url
    const pathparam1 = "/api";
    const pathparam2 = "/v1";
    const pathparam3 = "/delete";
    const pathparam4 = "/2";

    //Set the expected data
    cy.fixture("deleteDummyResponse").as("expectedData");

    //Send the Delete request
    cy.get("@expectedData").then((expectedData) => {
      cy.request({
        method: "DELETE",
        url: `${pathparam1}${pathparam2}${pathparam3}${pathparam4}`,
      }).then((response) => {
        //Do assertions
        const actualData = response.body;
        //Assert that Status code is 200
        expect(response.status).to.eq(200);
        //Assert that  "status"is  "success",
        expect(actualData.status).to.eq(expectedData.status);
        //Assert that  "data" is  "2",
        expect(actualData.data).to.eq(expectedData.data);
        //Assert that  "message"  is  "Successfully! Record has been deleted"
        expect(actualData.message).to.eq(expectedData.message);
      });
    });
  });
});
