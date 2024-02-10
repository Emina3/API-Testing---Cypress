/*
    Given
        https://restful-booker.herokuapp.com/booking
    And
        {
            "firstname": "Selim",
            "lastname": "Ak",
            "totalprice": 11111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2021-09-09",
                "checkout": "2021-09-21"
            }
        }
    When
        I send POST Request to the Url
    Then
        Status code is 200
        And response body should be like    {
                                                "bookingid": 11,
                                                "booking": {
                                                                "firstname": "Selim",
                                                                "lastname": "Ak",
                                                                "totalprice": 11111,
                                                                "depositpaid": true,
                                                                "bookingdates": {
                                                                                    "checkin": "2020-09-09",
                                                                                    "checkout": "2020-09-21"
                                                                                }
                                                            }
                                            }
*/

describe("Post Request Method",()=>{
   
    it("",function(){

        // i) Set the url
        const pathParam = "/booking";

        // ii) Set the payload
           cy.fixture("postBookingPayload").as("payload");

        // iii) Send "POST" request
           cy.get("@payload").then((payload)=>{

            cy.request({
                method:"POST",
                url: `${pathParam}`,
                body: payload,
                headers:{
                    "Content-Type": "application/json",
                }
                }).then((response)=>{

              // iv) Do Assertions
                  const actualData = response.body.booking;

              // 1) Assert that Status code is 200
                 expect(response.status).to.eq(200);
              
              // 2) Assert that firstname is "Selim"
              expect(actualData.firstname).to.eq(payload.firstname);

              // 2) Assert that lastname is "Ak"
              expect(actualData.lastname).to.eq(payload.lastname);

               // 3) Assert that "totalprice" is 11111,
               expect(actualData.totalprice).to.eq(payload.totalprice);

                  // 4) Assert that "depositpaid" is true,
                  expect(actualData.depositpaid).to.eq(payload.depositpaid);

                   // 6) Assert that bookingdates "checkin" is "2021-09-09" ,
                   expect(actualData.bookingdates.checkin).to.eq(payload.bookingdates.ckeckin);

                   // 7) Assert that bookingdates "checkout" is "2021-09-21"
                   expect(actualData.bookingdates.checkout).to.eq(payload.bookingdates.ckeckout);



                });

           });
         
         
             




        });





    });