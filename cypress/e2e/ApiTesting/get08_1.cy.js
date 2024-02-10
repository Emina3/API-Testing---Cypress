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

describe("GET Request method", () => {
  it("it should verify response body details and headers", () => {
    //i)Set the url
    const pathParam1 = "/todos";
    const pathParam2 = "/2";

    //ii)Set the expected data
    const expectedData = {
      statusCode: 200,
      userId: 1,
      title: "quis ut nam facilis et officia qui",
      completed: false,
      via: "1.1 vegur",
      server: "cloudflare", // headerlerle calisirken hep kucuk harf kullanmaliyiz
    };
    //iii)Send GET Request
    cy.request({
      method: "GET",
      url: `${pathParam1}${pathParam2}`,
    }).then((response) => {
      //iv) Do Assertions
      // 1)HTTP Status Code should be 200
      expect(response.status).to.eq(200);
      // 2)Assert that userId is "1"
      expect(response.body.userId).to.eq(expectedData.userId);
      // 3)Assert that title is "quis ut nam facilis et officia qui"
      expect(response.body.title).to.eq(expectedData.title);
      // 5)Assert that completed is "false"
      expect(response.body.completed).to.eq(expectedData.completed);
      // 6)Assert that header via is "1.1 Vegur"
      expect(response.headers.via).to.eq(expectedData.via);
      // 7)Assert that header server is "cloudflare"
      expect(response.headers.server).to.eq(expectedData.server);
    });
  });
});
