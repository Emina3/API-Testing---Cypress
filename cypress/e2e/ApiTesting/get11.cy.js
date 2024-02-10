/*
  Given
        https://restful-booker.herokuapp.com/booking/2
    When
        User sends GET Request to the URL
    Then
        Assert that Status code is 200
    And
        Assert that firstname is Mark
    And
        Assert that lastname is Ericsson
    And 
        Assert that total price is 217
    And
        Assert that deposit paid is true
    And 
        Assert that checkin date is "2023-06-28"
    And
        Assert that checkin date is "2023-07-28"
*/

describe("GET Request method", ()=>{

    it("",function(){

        // i) Set the url
          const pathParam1 = "/booking";
          const pathParam2 = "/2";

       // ii) Set the expected data
        cy.fixture("bookingUniqueTestData").as("expectedData");
        
        // iii) Send the expected data
         cy.request({
            method: "GET",
            url: `${pathParam1}${pathParam2}`,
         }).then((response)=>{

            const actualData = response.body;


            // iv) Do Assertions
            // 1) Assert that Status code is 200
             expect(response.status).to.eq(this.expectedData.statusCode);
            // 2)Assert that firstname is Mark
            expect(actualData.firstname).to.eq(this.expectedData.firstname);
            // 3)Assert that lastname is Mark
            expect(actualData).to.have.property("lastname",this.expectedData.lastname);
            // 4)Assert that total price is 469
            expect(actualData).to.include({
                totalprice: this.expectedData.totalprice,
                depositpaid: this.expectedData.depositpaid,
            });

            //5)Assert that checkin date is "2023-06-28"
            expect(actualData.bookingdates.chekin).to.eq(this.expectedData.bookingdates.chekin);
           //6) Assert that checkin date is "2023-07-28"
            expect(actualData.bookingdates.checkout).to.eq(this.expectedData.bookingdates.checkout);

         });

    });

});