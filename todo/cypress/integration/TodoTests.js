describe("Page Load Testing",  function() {
    it("Home Page loads", function(){
    cy.visit("http://localhost:3000")
    })
    it("Login Page loads", function(){
        cy.visit("http://localhost:3000/login")
    })
})

describe("Limited Access Testing: Should Return False",  function() {
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

describe("Home Page Button Checks", function () {
    it("All Buttons", function () {
        cy.get("button").click({multiple: true})
    })
    it("Check Log In now", function() {
        cy.visit("http://localhost:3000")
        cy.contains("Log in now").click()
        cy.url().should("include", "/login")
    })
})

describe("Login Page Functionality", function () {
    it("Check Log In now", function() {
        cy.visit("http://localhost:3000/login")
        cy.get("#username")
        .type("notARegisteredUser")
    })
})
