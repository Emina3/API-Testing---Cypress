/*
Given 
    https://jsonplaceholder.typicode.com/todos/198
  When 
    User sends a GET Request to the endpont
  Then
     Status Code is 200
   And
     Status text is OK
   And 
      Response time is less than 900ms
   And 
      Response body is JSON data type
   And
      "title" is  "quis eius est sint explicabo",   
    And 
      "completed" is "true" 
     And 
       "userID" is 10 
     
*/

describe("Get Request Mehod", () => {
    // it() ==> test method
  it("Status code, text, response time, data type, body details with soft assertion", () => {
    //i)Status Code
    const url = " https://jsonplaceholder.typicode.com/todos/198 ";

    //ii) Set the playload

    // iii) Send the GET  request
    cy.request({
      method: "GET",
      url: url,
    }).then((response) => {
      // iv)Do Assertion
      // ==========>>>>>>>>> These are hard assertions
      //Assert that status code is 200
      expect(response.status).to.equal(200);
      //Assert that statusText is "OK"
      expect(response.statusText).to.eq("OK");
      //Assert that response time is less than 700ms
      //   expect(response.duratio).to.be.lessThan(700);
      //Assert that Response body is JSON data type
      expect(response.headers["content-type"]).to.include("application/json");
      //Assert that response title is "quis eius est sint explicabo"
      expect(response.body.title).to.eq("quis eius est sint explicabo");
      //Assert that "completed" is "true"
      expect(response.body.completed).to.be.true;
      //Assert that "userId" is 10
      expect(response.body.userId).to.eq(10);
    })
})

// only koyunca onu calistirir   ====; skip ekleyince o it() skip yapar
    it.only("Status code, text, response time, data type, body details with soft assertion",()=>{
       //i)Status Code
    const url = "https://jsonplaceholder.typicode.com/todos/198 ";

    //ii) Set the playload

    // iii) Send the GET  request
    cy.request({
      method: "GET",
      url: url,
    }).then((response) => {

        console.log(response.body);
        cy.log(JSON.stringify(response.body));

        //iv)Do Soft Assertion
         //Assert that status code is 200
         cy.softAssert(response.status,200,"Status should have been 200","equal");

         //Assert that statusText is "OK"
         cy.softAssert(response.statusText,"OK","Status text should have been OK","equal");

         //Assert that response time is less than 700
         cy.softAssert(response.duration,700,"Response time d=should hav been less than 700","lessTaha");

         //Assert that response body is JSON data type
         cy.softAssert(response.headers["content-type"],"application/json","Response body should have been JSON","include");

         //Assert that response title is "quis eius est sint explicabo"
         cy.softAssert(response.body.title,"quis eius est sint explicaboTTT","Title is wrong","equal");

         //Assert that "completed" is "true"
         cy.softAssert(response.body.completed,true,"Completed is wrong","equal");

         //Assert that "userId" is 10
         cy.softAssert(response.body.userId,10,"UserId is wrong","equal");
    });
   //Checks all soft assertions at the end
    cy.assertAll();
  });
});
