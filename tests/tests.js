describe("DOM Tests", function() {
    before(function() {
        casper.start("https://pstest.irondistrict.org/admin/pw.html");
    });

    it("jQuery is loaded", function() {
        "jQuery".should.be.loaded;
    });

    it("document has #btnEnter", function() {
        '#btnEnter'.should.be.inDOM;
    });

    it("document has #newUsername", function() {
        '#newUsername'.should.be.inDOM;
    });

    it("document has #newPassword", function() {
        '#newPassword'.should.be.inDOM;
    });

    it("document has #divMayus", function() {
        "#divMayus".should.be.inDOM;
    });
});