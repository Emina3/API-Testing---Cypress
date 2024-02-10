/*
    Given
        https://jsonplaceholder.typicode.com/todos/198
    When
        User sends a GET Request to the endpoint
    Then
        Status code is 200
    And
        Status text is OK
    And 
        Response time is less than 300ms
    And
        Response body is JSON data type
    And
        "title" is "quis eius est sint explicabo"
    And 
        "completed" is "true"
    And
        "userId" is "10"
*/

describe("GET Request Method", ()=>{

    it("Status code, text, response time, data type, body details with hard assertion", ()=>{

        //i)Set the URL
        const url = "https://jsonplaceholder.typicode.com/todos/198";

        //ii)Set the payload

        //iii)Sen dthe GET Request
        cy.request({
            method: "GET",
            url: url
        }).then((response)=>{

            console.log(response.body);
            cy.log(JSON.stringify(response.body));

                                        //iv)Do hard Assertions
            //=====> Asagidaki Assertion'lar Hard Assertion'dir.
            //Assert that status code is 200
            expect(response.status).to.eq(200);
            //Assert that Status text is OK
            expect(response.statusText).to.eq("OK");
            //Assert that Response time is less than 300ms
            expect(response.duration).to.be.lessThan(300);
            //Assert that Response body is JSON data type
            expect(response.headers["content-type"]).to.include("application/json");
            //Assert that response title is "quis eius est sint explicabo"
            expect(response.body.title).to.eq("quis eius est sint explicabo");
            //Assert that "completed" is "true"
            expect(response.body.completed).to.be.true
            //Assert that "userId" is 10
            expect(response.body.userId).to.eq(10);
        })
    })

    it("Status code, text, response time, data type, body details with soft assertion", ()=>{

        //i)Set the url
        const url = "https://jsonplaceholder.typicode.com/todos/198";

        //i)Set the payload

        //iii)Send the GET Request
        cy.request({
            method: "GET",
            url: url
        }).then((response)=>{

            console.log(response.body);
            cy.log(JSON.stringify(response.body));

            //iv)Do soft assertion
            //Assert that status code is 200
            cy.softAssert(response.status, 200, "Status code should have been 200", "equal");
            //Assert that status text is OK
            cy.softAssert(response.statusText, "OK", "Status text should have been OK", "equal");
            //Assert that Response time is less than 300ms
            cy.softAssert(response.duration, 300, "Response  time should have been less than 300", "lessThan");
            //Assertt that Response body is JSON data type
            cy.softAssert(response.headers["content-type"], "application/json", "Response body should have been JSON", "include");
            //Assert that response title is "quis eius est sint explicabo"
            cy.softAssert(response.body.title, "quis eius est sint explicabo", "Title is wrong", "equal");
            //Assert that "completed" is "true"
            cy.softAssert(response.body.completed, true, "Completed is wrong", "equal");
            //Assert that "userId" is 10
            cy.softAssert(response.body.userId, 10, "User id is wrong", "equal");

        })
    })
});