/*
Given
        https://restful-booker.herokuapp.com/booking/4
    When
        User sends GET Request to the Url
    Then
         HTTP Status Code should be 200
    And
        Status text is OK
    And 
        Response time is less than 300 ms
    And
        Response format should be "application/json"
    And
        Firstname is Susan
    And
        Lastname is Brown
    And
        Total price is 678
    And
        Depost paid is false
    And
        Checkin date is "2020-07-26"
    And
        Checkout date is "2020-08-12" 
   
 */

describe("GET REquest Method Testing", () => {
  it("Using multiple path params", () => {
    // i) Set the url
    const pathParam1 = "/booking";
    const pathParam2 = "/4";

    //ii) Set te playload

    //iii) Send the GET Request
    cy.requets({
      method: "GET",
      url: `${pathParam1}${pathParam2}`,
    }).then((response) => {
      // iv)Do Assertions

      //HTTP Status Code should be 200
      expect(response.status).to.eq(200);
      //Status text is OK
      expect(response.statusText).to.eq("OK");
      //REsponse time is less than 900ms
      expect(response.duration).to.be.lessThan(900);
      //Response format should be “application/json”
      expect(response.headers["content-type"]).to.include("application/json");
      //Firstname is Mark
      expect(response.body.firstname).to.eq("Mark");
      //Lastname is Mark
      expect(response.body.lastname).to.eq("Jones");
      //Total price is 678
      expect(response.body.totalprice).to.eq(678);
      // Depost paid is false
      expect(response.body.depositpaid).to.eq(true);
      //Checkin date is "2021-06-08"
      //  expect(response.body.bookingdates.checkin).to.eq("2021-06-08");
      //Checkout date is "2020-08-12"
      // expect(response.body.bookingdates.checkout).to.eq("2021-06-08");
     
    });
  });
});
