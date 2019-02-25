const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {

   beforeEach((done) => {
      this.book = new ContactController();


      sequelize.sync({force: true}).then((res) => {
        done();
      })
      .catch((err) => {
        done();
      });
   });


  describe("#addContact()", () => {

    it("should add a single contact into the book", () => {
      expect(this.book.contacts.length).toBe(0);
      this.book.addContact("Alice", "001-001-1010");
      expect(this.book.contacts.length).toBe(1);
    });

  });
})