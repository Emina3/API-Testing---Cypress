/*
    Given
        https://jsonplaceholder.typicode.com/todos/198
    When
        User sends DELETE Request to the Url
    Then
        Status code is 200
    And 
        Response body is { }
*/

describe("DELETE request method", () => {
  it("should delete  existing data successfully ", () => {
    //1-Set the url
    const pathparam1 = "/todos";
    const pathparam2 = "/198";
    //2-Set the payload or expected data
    //payload olmadıgı ıcın birşey yapmıyoruz

    //3-Send the delete request
    cy.request({
      method: "DELETE",
      url: `${pathparam1}${pathparam2}`,
    }).then((response) => {
        
      //4-Do Assertions
      // i) Assert that   Status code is 200
      expect(response.status).to.eq(200);

      // ii) Assert that Response body is empty
      //1.way
      expect(response.body).to.be.empty;
      //2.yol olarak bu sekılde  assert edebılırz
      expect(Object.keys(response.body).length).to.eq(0);
    });
  });
});
