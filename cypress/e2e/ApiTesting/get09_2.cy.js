/*
 Given
        https://gorest.co.in/public/v1/users
    When
        User sends GET Request to the URL
    Then
        Assert that Status code is 200
    And
        Assert that total is "2930"
    And
        Assert that pages value is "293"
    And 
        Assert that page is "1"
    And
        Assert that limit is "10"
    And 
        Assert that previous link is "null"
    And
        Assert that current link is "https://gorest.co.in/public/v1/users?page=1"
    And
        Assert that next link is "https://gorest.co.in/public/v1/users?page=2"
    And
        Assert that number of females is less than the number of males
*/

describe("GET Request Method", () => {
  it("should verify meta data details", function(){
    // i)Set the url
    const pathParam1 = "/public";
    const pathParam2 = "/v1";
    const pathParam3 = "/users";

    // ii) Set expected data

    cy.fixture("goRestMetaTestData").as("expectedData");

    // iii) Send Get Request
    cy.request({
      method: "GET",
      url: `${pathParam1}${pathParam2}${pathParam3}`,
    }).then((response) => {
      //iv) Do Assertions

      const actualData = response.body.meta.pagination;

      // 1)HTTP Status Code should be 200
      expect(response.status).to.eq(this.expectedData.status);
      // 2)Assert that total is "2871"
      expect(actualData.total).to.eq(this.expectedData.pagination.total);
      // 3)Assert that pages value is "293"
      expect(actualData.pages).to.eq(this.expectedData.pagination.pages);
      // 4)Assert that page is "1"
      expect(actualData.page).to.eq(this.expectedData.pagination.page);
      // 5)Assert that limit is "10"
      expect(actualData.limit).to.eq(this.expectedData.pagination.limit);
      // 6)Assert that previous link is "null"
      expect(actualData.links.previous).to.eq(this.expectedData.pagination.links.previous);
      // 7) Assert that next link is "https://gorest.co.in/public/v1/users?page=2"
      expect(actualData.links.current).to.eq(this.expectedData.pagination.links.current);
      // 8)Assert that number of females is less than the number of males
      expect(actualData.links.next).to.eq(this.expectedData.pagination.links.next);
      // 9) Assert that number of females is less than the number of males
     const genders = response.body.data.map((user)=>user.gender);
     const numOfFemales = genders.filter((gender)=> gender ==="female").length; // === esitir demek in cy
     const numOfMales = genders.length - numOfFemales;
     expect(numOfFemales).to.be.lessThan(numOfMales);
    });
  });
});

// 1.fixture de goRestMetaData.json file olusturduk
// 2.expectedData sildik ve  cy.fixture("goRestMetaTestData").as("expectedData"); yazdik
// 3.it() icindeki arrrow methodu sildik ve onu normal functio(){} yaptik
// 4.asserions icinde expectedData lari onunde this keyword ekledik  expect(actualData.links.next).to.eq(this.expectedData.pagination.links.next);
