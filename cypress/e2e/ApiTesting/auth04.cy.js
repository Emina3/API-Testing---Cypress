/*
    Given
        Users url https://api.github.com/users/
    And
        Repo Name is "testRepo"
    And
        GitHub token
    And 
        GitHub username
    When 
        User sends POST Request to the url
    Then 
        Status code is 201
    And
        Response body has name property with the name value
    And 
        Response body has private property with the private value
*/

/*
    Given
        Users url https://api.github.com/repos
    And
        Repo Name is "testRepo"
    And
        GitHub token
    And 
        GitHub username
    When 
        User sends DELETE Request to the url
    Then 
        Status code is 204
*/

describe("GitHUb repo creation with token", () => {
  const repoPostUrl = Cypress.env("GIT_HUB_API_REPO_POST_URL");
  const repoDeleteUrl = Cypress.env("GIT_HUB_API_REPO_DELETE_URL");
  const gitHubUsername = Cypress.env("GIT_HUB_USERNAME");
  const gitHubToken = Cypress.env("GIT_HUB_TOKEN");
  const postPayload = {
    name: "testRepo2",
    description: "This is a test repository",
    private: false,
  };

  it("Creates repo in G", () => {
    cy.request({
      method: "POST",
      url: repoPostUrl,
      body: postPayload,
      headers: {
        Authorization: `token ${gitHubToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", postPayload.name);
      expect(response.body).to.have.property("private", postPayload.private);
    });
  });

  it("Deletes repo", ()=>{
   
    const repoName = "testRepo2";

    cy.request({
        method: "DELETE",
        url:`${repoDeleteUrl}/${gitHubUsername}/${repoName}`,
        headers: {
            Authorization: `token ${gitHubToken}`,
          },
        }).then((response) => {
            expect(response.status).to.eq(204);
          //  expect(response.body).to.have.property("");  ===> calismadi,hoca kaldirmis
    });

  })
});
