/*
Given
https://jsonplaceholder.typicode.com/todos/2
When
User sends GET Request to the URL
Then
Assert that Status code is 200
And
Assert that userId is "1"
And
Assert that title is "quis ut nam facilis et officia qui"
And 
Assert that completed is "false"
And
Assert that header via is "1.1 Vegur"
And 
Assert that header server is "cloudflare"
*/

describe("GET Request method",()=>{
    it("it should verify response body details and headers", function(){
      //i)Set the url
      const pathParam1 = "/todos";
      const pathParam2 = "/2";
  
      //ii)Set the expected data
        cy.fixture("todosTestData").as("expectedData"); 
        // fixture kullaninca arroe function it de normal function yapacagiz
       
      //iii)Send GET Request
      cy.request({
        method: "GET",
        url: `${pathParam1}${pathParam2}`,
      }).then((response) => {
        //iv) Do Assertions
        // 1)HTTP Status Code should be 200
        expect(response.status).to.eq(this.expectedData.StatusCode);
        // 2)Assert that userId is "1"
        expect(response.body.userId).to.eq(this.expectedData.userId);
        // 3)Assert that title is "quis ut nam facilis et officia qui"
        expect(response.body.title).to.eq(this.expectedData.title);
        // 5)Assert that completed is "false"
        expect(response.body.completed).to.eq(this.expectedData.completed);
        // 6)Assert that header via is "1.1 Vegur"
        expect(response.headers.via).to.eq(this.expectedData.Via);
        // 7)Assert that header server is "cloudflare"
        expect(response.headers.server).to.eq(this.expectedData.Server);
      });
    });
  });
  