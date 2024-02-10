/*
    Given
        url https://reqres.in/api/login
    And
        username cityslicka
    And
        password eve.holt@reqres.in
    When 
        User sends POST Request to the given URL
    Then 
        Status code is 200
    And 
        Response body has token
    And
        Print the token on the console
*/

describe("Login to Regres API and create token", () => {
  const regresApiUrl = Cypress.env("REGRES_API_URL");
  const regresUsername = Cypress.env("REGRES_USERNAME");
  const regresPassword = Cypress.env("REGRES_PASSWORD");

  it("Successfuly logs in and receives token", () => {
    cy.request({
      method: "POST",
      url: regresApiUrl,
      body: {
        email: regresUsername,
        password: regresPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      cy.log("Received token: ", response.body.token);
      
    });
  });
});
