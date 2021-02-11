describe("Page Load Testing",  function() {
    it("Home Page loads", function(){
    cy.visit("http://localhost:3000")
    })
    it("Login Page loads", function(){
        cy.visit("http://localhost:3000/login")
    })
})

describe("Limited Access Testing",  function() {
    it("Dashboard Page loads", function(){
        cy.visit("http://localhost:3000/dashboard")
    })
    it("UserProfile Page loads", function(){
        cy.visit("http://localhost:3000/userprofile")
    })
    it("Project Page loads", function(){
        cy.visit("http://localhost:3000/projectpage")
    })
})

describe("New Test", function () {
    it("", function () {
        cy.get("button").click()
    })
})

// describe("Home Page Elements Test",  function() {
//     cy.get('button').then(($btn) => {
//         if ($btn.hasClass('active')) {
//           // do something if it's active
//         } else {
//           // do something else
//         }
//     })
// })

// describe("New",  function() {
//     cy.visit().then(($btn) => {
//         if ($btn.hasClass('active')) {
//           // do something if it's active
//         } else {
//           // do something else
//         }
//     })
// })