/*
Given 
    https://restful-booker.herokuapp.com/booking/2024
  When 
    User sends a GET Request to the endpont
  Then
     Status Code is 404
   And
     Status text is Not Found
   And 
      Response body includes Not Found
   And 
      Response body does not includes "Thechpro Education"
   And
      Header Server is Cowboy    
    And 
      Header Connection is "keep-alive"  
      
      https://jsonplaceholder.typicode.com/todos/198
*/

describe("GET Method Testing", () => {
  it("Status code,text,body, header will be tested", () => {
    // i)Set the URL
    const url = "https://restful-booker.herokuapp.com/booking/2024";

    // ii) Set the playload

    // iii) Send the GET REquest
    cy.request({
      method: "GET",
      url: url,
      failOnStatusCode: false, //4×× status code'larda testin otomatik olarak fail etmesini engelledim
    }).then((response) => {
      // DEveloper console'a response body yazdirin
      console.log(response.body);

      //Cypress console'a response body yazdirin
      cy.log(JSON.stringify(response.body));

      // iv) Do Assertions
      // Assert that Status code is "404"
      expect(response.body).to.equal(404);

      // Assert that Status text is "Not Found"
      expect(response.body).to.eq("Not Found");

      // Assert that Response body includes "Not Found"
      expect(response.body).to.include("Not Found");

      // Assert that Response body does not includes "Techpro Education"
      expect(response.body).to.not.include("Not Found");

      // Assert that Header Server is "Cowboy"
      expect(response.headers["content-type"]).to.eq("Cowboy");

      // Assert that Header Server is "Cowboy"
      expect(response.headers["server"]).to.eq("Cowboy");

      // Assert that Header connection is "keep-alive"
      expect(response.headers["connection"]).to.eq("keep-alive");
    })
  });
});
