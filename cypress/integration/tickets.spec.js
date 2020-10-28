describe("Tickets", ()=>{
    
    beforeEach( () => {
        cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html");
    });
    
    it("fills all input text fields", ()=>{
        const firstName = "Lucas";
        const lastName = "Amaral";
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("amaral@gmail.com");
        cy.get("#requests").type("Steak");
        cy.get("#signature").type(`${lastName} ${firstName}`);
    });

    it("select two tickets from select component", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select VIP options radio button component", () => {
        cy.get("#vip").check();
    });

    it("select social media checkbox", () => {
        cy.get("#social-media").check();
    });

    it("select 'friend' and 'publication' then uncheck 'friend' checkbox", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has TICKETBOX header's heading", () => {
        cy.get("header h1").should("contain","TICKETBOX");
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
        .as("email")
        .type("asdf");

        cy.get("#email.invalid")
        .as("invalidEmail")
        .should("exist")

        cy.get("@email")
        .clear()
        .type("asdf@gmail.com");

        cy.get("#email.invalid")
        .should('not.exist');
    });
    it("fills and reset the form", () => {
        const firstName = "Lucas";
        const lastName = "Amaral";
        const fullName = `${firstName} ${lastName}`;
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 1 General Admission ticket.`
        )

        cy.get("#email").type("amaral@gmail.com");
        cy.get("#ticket-quantity").select("2");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 General Admission tickets.`
        );

        cy.get("#vip").check();

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );
        
        cy.get("#friend").check();
        cy.get("#requests").type("Steak well grounded");

        cy.get("#agree").check();
        
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset'").click();

        cy.get("@submitButton").should("be.disabled");

    });

    it("fills required fields using support commands", () => {
        const customer = {
            firstName: "Lucas",
            lastName: "Amaral",
            email: "asdf@gmail.com"
        }

        cy.fillRequiredFields(customer);
        cy.get("button[type='reset']").click();

        cy.get("button[type='submit']").should("be.disabled");

    })

})