/* 
    Gherkin language
    Given: Kelimesinden sonra on gereksinimler yazilir
           Ornegin GET Metod'u icin enpoint bir prerequisite dir.
           POST metodu icin endpoint ve payload prerequiste'dir.
    When: Kelimesinden sonra yapilacak is yazilir.
          Ornegin GET Request
          
    Then: Istenen sonuclar yazilir.
    And: Yukaridaki 3 kelime icin birden fazla giris yapilacaksa aralarina And yazilir.
    
    ornek Test case
    Given
    https://restful-booker.herokuapp.com/booking/3
    When
       User sends a GET Request
    Then
       HTTP Status code should be 200
    And
       Status text should be OK
    And 
       Response time should be less than 300ms
    And
       Response body should be JSON Data Type
*/

describe("GET Method Testing", () =>{

   it("get01",()=>{

     // i) Set the Endpoint
     const url = "https://restful-booker.herokuapp.com/booking/3";

     // ii) Set the payload

     // iii) Send the request
       cy.request({
         method: "GET",
         url:url
       }).then((response)=>{
         
         // Respons'i developer console'da gorelim
         console.log(response.body);
         
         //Response'i Cypress console'unda gorelim *** test bitince siliyoruz
         cy.log(JSON.stringify(response.body));

         //iv)Assertion -dogrulamaya baslayalim
         // Assert that Satatus Code is 200
         expect(response.status).to.eq(200);

         //Assert that Status text is OK
         expect(response.statusText).to.equal("OK");

         //Asset that Response time is less than 300ms {}|"?\'\\\/.,;']"
         expect(response.duration).to.be.lessThan(900);

         //Assert that Response body is JSON Data Type
         expect(response.headers["content-type"]).to.include("application/json");
        
       });
   });  
});