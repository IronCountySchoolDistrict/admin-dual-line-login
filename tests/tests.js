describe("DOM Tests", function() {
    before(function() {
        casper.start("https://pstest.irondistrict.org/admin/pw.html");
    });

    it("jQuery is loaded", function() {
        "jquery".should.be.loaded;
    });

    it("document has #btnEnter", function() {
        "#btnEnter".should.be.inDOM;
    });

    it("document has #LoginForm", function() {
        "#LoginForm".should.be.inDOM;
    });

    it("#btnEnter has attr onclick", function() {
        "#btnEnter".should.not.have.attr("onclick");
    });

    it("document has #newUsername", function() {
        "#newUsername".should.be.inDOM;
    });

    it("document has #newPassword", function() {
        "#newPassword".should.be.inDOM;
    });

    it("document has #divMayus", function() {
        "#divMayus".should.be.inDOM;
    });

    it("document has #divSemi", function() {
        "#divSemi".should.be.inDOM;
    });

    it("document has #fields-template", function() {
        "#fields-template".should.be.inDOM;
    });

    it("fieldPassword has been removed from the DOM", function() {
        "#fieldPassword".should.not.be.inDOM;
    });

    it("label[for=fieldPassword] has been removed from the DOM", function() {
        "label[for=fieldPassword]".should.not.be.inDOM;
    });

    it("fieldPassword has been removed from the DOM", function() {
        "#fieldPassword".should.not.be.inDOM;
    });

    it("input[name=username][type=hidden] has been removed from the DOM", function() {
        "fieldset div:nth-child(1)".should.be.inDOM;
    });
});