afterEach(() => {
    cy.wait(2200)
})

describe("Page Load Testing",  function() {
    it("Home Page loads", function(){
    cy.visit("http://localhost:3000")
    })
    it("Login Page loads", function(){
        cy.visit("http://localhost:3000/login")
    })
}) 

describe("Limited Page Access",  function() {
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

describe("Login Page Testing", function () {
    it("Error Login Validation", function() {
        cy.visit("http://localhost:3000/login")
        cy.get("#input_username").type("testUser")
        cy.get("#input_password").type("aaaaaaaa")
        cy.get(".login_button").click({ force: true })
        cy.contains("Invalid login")
    })

    it("Login Validation", function() {
        cy.visit("http://localhost:3000/login")
        cy.get("#input_username").type("testUser")
        cy.get("#input_password").type("aaaaaa")
        cy.get(".login_button").click()
        cy.url().should("include", "/dashboard")
        cy.contains("USER PROFILE")
        cy.contains("DASHBOARD")
        cy.contains("ACCOUNT")
    })
}) 

describe("Dashboard Page", function () {
    it("Add Project Testing", function() {
        cy.visit("http://localhost:3000/login")
        cy.get("#input_username").type("testUser")
        cy.get("#input_password").type("aaaaaa")
        cy.get(".login_button").click()
        cy.get("#addBtnCy").click()
        cy.get(".project_title_input").click().type("Cypress Testing")
        cy.get("#cyDueDateInput").type("2021-02-15")
        cy.get("#cyFormTest").submit()
        cy.contains("Cypress Testing")
    }) 

    it("Colourblind Mode", function(){
        cy.visit("http://localhost:3000/login")
        cy.get("#input_username").type("testUser")
        cy.get("#input_password").type("aaaaaa")
        cy.get(".login_button").click()
        cy.visit("http://localhost:3000/project/2")
        cy.get(".colourblind_btn").click()
        // cy.wait(3500)
        cy.get("#cyColorBlindCheck").should("have.css", "background-image")
        cy.wait(1000)
        cy.get(".colourblind_btn").click()
    })
})

describe("Register Check", function(){
    it("Register Validation Check", function(){
        cy.visit("http://localhost:3000/register")
        cy.get("#cyRegisterUsernameInput").type("Cypress Testing")
        cy.get("#cyRegisterPasswordInput").type("pass") 
        cy.wait(1000)
        cy.get(".register_button").click()
    })

    it("Register Cypress", function(){
        cy.visit("http://localhost:3000/register")
        cy.get("#cyRegisterUsernameInput").type("CypressTesting")
        cy.get("#cyRegisterPasswordInput").type("superSecretPassword") //superSecretPassword
        cy.wait(500)
        cy.get(".register_button").click()
    })
})

describe("Database Requests", function(){
    it("Delete All", function() {
        const baseUrl = "http://localhost:4000/project/"
        cy.visit("http://localhost:3000/login")
        cy.get("#input_username").type("testUser")
        cy.get("#input_password").type("aaaaaa")
        cy.get(".login_button").click()
        cy.visit("http://localhost:3000/dashboard")
        cy.request('DELETE', `${baseUrl}5`)
        cy.request('DELETE', `${baseUrl}4`)
        cy.request('DELETE', `${baseUrl}3`)
        cy.request('DELETE', `${baseUrl}2`)
        cy.request('DELETE', `${baseUrl}1`)
        cy.visit("http://localhost:3000/login")
        cy.get("#input_username").type("testUser")
        cy.get("#input_password").type("aaaaaa")
        cy.get(".login_button").click()
        cy.visit("http://localhost:3000/dashboard")
    })

    it("Add Multiple Projects", function(){
        cy.request({
            method: 'POST',
            url: "http://localhost:4000/createProject",
            form: true, 
            body: {
              projectTitle: `Shanie's Project`,
              userId: 1
            }
          })
          cy.request({
            method: 'POST',
            url: "http://localhost:4000/createProject",
            form: true, 
            body: {
              projectTitle: `Ilia's Project`,
              userId: 1
            }
          })
          cy.request({
            method: 'POST',
            url: "http://localhost:4000/createProject",
            form: true, 
            body: {
              projectTitle: `Jeffery's Project`,
              userId: 1
            }
          })
          cy.contains("Shanie's Project")
          cy.visit("http://localhost:3000/login")
          cy.get("#input_username").type("testUser")
          cy.get("#input_password").type("aaaaaa")
          cy.get(".login_button").click()
          cy.contains("Shanie's Project")
          cy.contains("Ilia's Project")
    })
})