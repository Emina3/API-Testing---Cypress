/*
    Given
        https://dummy.restapiexample.com/api/v1/create
    And
        {
            "employee_name": "Tom Hanks",
            "employee_salary": 111111,
            "employee_age": 23,
            "profile_image": "Perfect image"
        }
    When
        User sends POST Request
    Then
        Status code is 200
    And
        Response body should be like the following
              {
                   "status": "success",
                    "data": {
                    "employee_name": "Tom Hanks",
                     "employee_salary": 111111,
                     "employee_age": 23,
                     "profile_image": "Perfect image",
                      "id": 4687
                      },
                   "message": "Successfully! Record has been added."
}
    */

                describe("POST Request method", () => {
                    it("should create new data", function () {
                      // i) Set the url
                      const pathParam1 = "/api";
                      const pathParam2 = "/v1";
                      const pathParam3 = "/create";
                  
                      // ii)Set the payload and expected data
                      cy.fixture("postDummyPayload").as("payload");
                      cy.fixture("postDummyResponse").as("expectedData");
                  
                      // iii) Send the "POST" request
                      cy.get("@payload").then((payload) => {
                         
                        cy.get("@expectedData").then((expectedData)=>{

                            cy.request({
                                method:"POST",
                                url:`${pathParam1}${pathParam2}${pathParam3}`,
                                body: payload,
                                headers: {
                                    "Content-Type":"application/json",
                                }
                            }).then((response)=>{
                                
            // iv)Do Assertions
                 const actualData = response.body;

        // 1) Assert that Status code is 200
        expect(response.status).to.eq(200);

        // 2) Assert that status is success
        expect(actualData.status).to.eq(expectedData.status);

        // 3) Assert that message is  "Successfully! Record has been added."
        expect(actualData.message).to.eq(expectedData.message);

        // 4) Assert that  "employee_name" is "Tom Hanks"
        expect(actualData.data.employee_name).to.eq(expectedData.data.employee_name);

         // 5) Assert that  "employee_salary" is 111111,
         expect(actualData.data.employee_salary).to.eq(expectedData.data.employee_salary);


           // 6) Assert that  "employee_age" is 23 ,
           expect(actualData.data.employee_age).to.eq(expectedData.data.employee_age);

            // 7) Assert that profile_image": "Perfect image",
            expect(actualData.data.profile_image).to.eq(expectedData.data.profile_image);





                            });


                        });


                      });
                    });
                });