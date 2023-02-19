describe("Submit", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080/contact-form")
        cy.get("#inpName").type("Erik")
        cy.get("#inpEmail").type("erik.skjellevik@lyse.net")
        cy.get("#message").type("test")
    })


    it("should post and clear message field, but keep name and email", () => {
        cy.visit("http://localhost:3000/contact-form")
        cy.get("#button").click();
        cy.get("#message").should("have.value", "")
    })
})