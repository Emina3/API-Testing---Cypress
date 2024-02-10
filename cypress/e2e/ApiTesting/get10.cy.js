/*
 Given
        https://gorest.co.in/public/v1/users/5850619
    When
        User sends GET Request to the URL
    Then
        Assert that Status code is 200
    And
        Assert that Response body is not null
    And
        Assert that id is 5850619
    And 
        Assert that email is "verma_rameshwar@baumbach.example"
    And
        Assert that gender is "male"
    And 
        Assert that status is "active"
    And
       Assert that name is "Sanka Anka"    

*/
describe("GET Rw=equest methods", ()=>{
it("should verify response details", function(){

    // i) Set the url
    const pathParam1 = "/public";
    const pathParam2 = "/v1";
    const pathParam3 = "/users";
    const pathParam4 = "/5886275";

    // ii) Set the expected data
    cy.fixture("goRestUniqueTestData").as("expectedData");

    // iii) Send the Get Request
     cy.request({
        method: "GET",
        url:`${pathParam1}${pathParam2}${pathParam3}${pathParam4}`,
     }).then((response)=>{

         //iv) Do Assertions

      const actualData = response.body.data;

      // 1)HTTP Status Code should be 200
      expect(response.status).to.eq(this.expectedData.statusCode);
      // 2)Assert that Response body is not null
      expect(response.body).to.not.be.null; // () not olmamasini kontorl eder
      // 3) Assert that id is 5850619
      expect(actualData).to.have.property("id",this.expectedData.id);
      // 4)Assert that email is "verma_rameshwar@baumbach.example"
      expect(actualData).to.have.property("email",this.expectedData.email);
      // 5)Assert that gender is "male"
      expect(actualData).to.have.property("gender",this.expectedData.gender);
      // 6)Assert that status is "active"
      expect(actualData).to.have.property("status",this.expectedData.status);
      // 7)Assert that name is "Sanka Anka"
      expect(actualData).to.have.property("name",this.expectedData.name);
 
    });
  });

  it("should verify response details", function(){

    // i) Set the url
    const pathParam1 = "/public";
    const pathParam2 = "/v1";
    const pathParam3 = "/users";
    const pathParam4 = "/5886275";

    // ii) Set the expected data
    cy.fixture("goRestUniqueTestData").as("expectedData");

    // iii) Send the Get Request
     cy.request({
        method: "GET",
        url:`${pathParam1}${pathParam2}${pathParam3}${pathParam4}`,
     }).then((response)=>{

         //iv) Do Assertions

      const actualData = response.body.data;

      // 1)HTTP Status Code should be 200
      expect(response.status).to.eq(this.expectedData.statusCode);
      // 2)Assert that Response body is not null
      expect(response.body).to.not.be.null; // () not olmamasini kontorl eder
     
      expect(actualData).to.include({
        id: this.expectedData.id,
        email: this.expectedData.email,
        gender: this.expectedData.gender,
        status: this.expectedData.status,
        name: this.expectedData.name,
      });
    });
  });
});













