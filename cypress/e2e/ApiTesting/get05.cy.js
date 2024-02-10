/*
 Given
            https://restful-booker.herokuapp.com/ https://restful-booker.herokuapp.com/booking?firstname=Mark&lastname=Jones
        When
            User send a request to the URL
        Then
             HTTP Status Code should be 200
        And
            Status text is OK
        And 
            Response time is less than 300 ms
		And
		    Response format should be “application/json”
	  	And
	  		Among the data there should be someone whose firstname is "Mark" and last name is "Jones"
*/

describe("Get REquest Method", () => {
  it("Testing with query parameters", () => {
    // i) Set the url
    const pathParam = "/booking";
    const queryParam = {
      firstname: "Susan",
      lastname: "Brown",
    };

    //ii)Set the playload

    //iii)Send the GET Request
    cy.request({
      method: "GET",
      url: pathParam, //
      qs: queryParam,
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
      //Among the data there should be someone whose firstname is "Mark" and last name is "Jones"
      const responseBody = Array.isArray(response.body)
        ? response.body
        : [response.body];

      expect(response.body).to.deep.include.members([{ bookingid: 4 }]);
    });
  });
});
