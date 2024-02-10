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
        Get and save the token

    Given
        url https://reqres.in/api/users/2
    And
        updatedUserData = {
            "name": "John Doe",
            "job": "Software Engineer"
        }
    And 
        Token will be taken from above POST Request
    When 
        User sends PUT Request to the given URL
    Then 
        Status code is 200
    And
        "name" is "John Doe"
    And 
        "job" is "Software Engineer"

*/

describe("Get the token and use it", () => {
  const regresUrl = Cypress.env("REGRES_API_URL");
  const regresUsername = Cypress.env("REGRES_USERNAME");
  const regresPassword = Cypress.env("REGRES_PASSWORD");
  let token;

  before(() => {
    //Create token and save it in a variable

    cy.request({
      method: "POST",
      url: regresUrl,
      body: {
        email: regresUsername,
        password: regresPassword,
      },
    }).then((response) => {
      token = response.body.token;
    });
  });

  it("Uses token in a PUT Request", () => {
    const urlToUpdate = Cypress.env("URL_TO_UPDATE");
    const updatedUserData = {
      name: "John Doe",
      job: "Software Engineer",
    };

    cy.request({
      method: "PUT",
      url: urlToUpdate,
      body: updatedUserData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", updatedUserData.name);
      expect(response.body).to.have.property("job", updatedUserData.job);
    });
  });
});
