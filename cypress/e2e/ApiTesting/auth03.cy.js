/*
    Given
        url https://api.github.com/users/
    And
        GitHub token
    And 
        GitHub username
    When 
        User sends GET Request to the given URL
    Then 
        Status code is 200
    And
        Response body has login property with the username value
    And 
        Response body has id property
    And 
        Response body has url property
    And 
        Location equals New York
*/

describe("Using GitHub GET Method wirh real token", () => {
  const gitHubUrl = Cypress.env("GIT_HUB_API_USERS_URL");
  const gitHubToken = Cypress.env("GIT_HUB_TOKEN");
  const gitHubUsername = Cypress.env("GIT_HUB_USERNAME");

  it("Fetches user info", () => {
    cy.request({
      method: "GET",
      url: `${gitHubUrl}/${gitHubUsername}`,
      headers: {
        Authorization: `token ${gitHubToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("login", gitHubUsername);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("url");
      expect(response.body.location).to.eq(null);
    });
  });
});
