const { expect } = require("@jest/globals");
import { render, screen, cleanup } from '@testing-library/react';
const Register = require("./../components/Register")
import React from "react"
import ReactDom from "react-dom"
import { createRenderer } from 'react-dom/test-utils';
import renderer from "react-test-renderer"

afterEach(cleanup)


    // test("Register: User Already Exists", function() {
    //     (expect(() => (onChange=() => setUsername("testUser").toThrowError("There was an error: User already exists"))))

    // });



    // it("Renders successfully!", () => {
    //     const registerPage = createRenderer()
    //     const {getByTestId} = render(<form onSubmit={register} data-testid="registerForm"> </form>)
    //     expect(getByTestId("registerForm")).toHaveProperty(<input></input>)
    //     // ReactDom.render(<form></form>, div)
    // })


    it("matches snapshot", () => {
        const tree = renderer.create(<form></form>).toJSON;
        expect(tree).toMatchSnapshot();
    })



    // test("", function() {
    //     const 
    // })

    // test("", function() {
        
    // })

    // test("", function() {
        
    // })
    // test("Checking: Throws an error with no weight", function() {
    //     expect(() => new Bag()).toThrowError("Error a weight must be added!");
    // });

    // test("Checking: Weight does have a truthy value", function() {
    //     const bag = new Bag(3);
    //     expect(bag.weight).toBeTruthy();
    // }) /** This was created to cover line 31 error checks ----> But it doesnt need some tweaking. */

    // test("Checking: The carry on status", function() {
    //     const carryBag1 = new Bag(11)
    //     expect(carryBag1).toBeTruthy()
    // });

    // test("Checking: The carryOn Method", function() {
    //     let jimmyBag = new Bag(7)
    //     jimmyBag.isCarryOn(7)
    //     jimmyBag.isCarryOn(15)
    //     expect(jimmyBag.carryOnBags).toContain(7)
    //     expect(jimmyBag.largeBags).toContain(15)
    // });

    // test('renders learn react link', () => {
    //     render(<App />);
    //     const linkElement = screen.getByText(/learn react/i);
    //     expect(linkElement).toBeInTheDocument();
    //   });
      
