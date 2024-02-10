/*
    Given
        https://dummy.restapiexample.com/api/v1/employees
    When
        User send GET Request to the URL
    Then
        Status code is 200
    And
        There are 24 employees
    And
        "Tiger Nixon" and "Garrett Winters" are among the employees
    And
        The greatest age is 66
    And
        The name of the lowest age is "[Tatyana Fitzpatrick]"
    And
        Total salary of all employees is 6,644,770
    */

describe("GET Request method", () => {
  // describe bir suit tir

  it("should verify status code,number of employees,names,the oldest and the youngest employees,salary", function () {
    // i) Set the url
    const pathParam1 = "/api";
    const pathParam2 = "/v1";
    const pathParam3 = "/employees";

    // ii) Set the expected data
    cy.fixture("dummyTestData").as("expectedData");

    // iii) Send the expected data
    cy.request({
      method: "GET",
      url: `${pathParam1}${pathParam2}${pathParam3}`,
    }).then((response) => {
      // iv) Do Assertions
      // 1) Assert that Status code is 200
      expect(response.status).to.eq(this.expectedData.statusCode);

      // 2)Assert that there are 24 employees
      expect(response.body.data).to.have.length(
        this.expectedData.numOfEmployees
      );

      // 3)  Assert that  "Tiger Nixon" and "Garrett Winters" are among the employees
      expect(
        response.body.data.map((item) => item.employee_name)
      ).to.include.members(this.expectedData.namesOfExpectedEmployees);

      // 4) Assert that the greatest age is 66
      let listOfAges = response.body.data.map((item) => item.employee_age);
      listOfAges.sort((a, b) => a - b);
      expect(listOfAges[listOfAges.length - 1]).to.eq(this.expectedData.maxAge);

      // 5) Assert that the name of the lowest age is "[Tatyana Fitzpatrick]"
      let theYoungestAge = listOfAges[0];
      let theYoungestEmployeeName = response.body.data
        .filter((item) => item.employee_age === theYoungestAge)
        .map((item) => item.employee_name);
      expect(theYoungestEmployeeName).to.include(
        this.expectedData.nameOfTheYoungestEmployee
      );

      // 6) Assert that total salary of all employees is 6,644,770
      let totalSalary = response.body.data.reduce(
        (sum, employee) => sum + employee.employee_salary,
        0
      );

      expect(totalSalary).to.eq(this.expectedData.expectedTotalSalary);
    });
  });
});
