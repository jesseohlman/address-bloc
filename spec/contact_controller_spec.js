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

    it("should add a single contact into the book", (done) => {
      
        this.book.addContact("Alice", "001-101-1010", "lolalin@alphabet.com")
        .then((contact) => {

            expect(contact.name).toBe("Alice");
            expect(contact.phone).toBe("001-101-1010");
            expect(contact.email).toBe("lolalin@alphabet.com");
            done();
        })
        .catch((err) => {
            done();
        })
    });

  });

  describe('#getContacts()', () =>{
      it("should return an empty array when no contacts are available", (done) => {
          this.book.getContacts()
          .then((contacts) => {
              expect(contacts.length).toBe(0);
              done();
          })
          .catch((err) => {
              console.lof(err);
              done();
          });
      });
      
      it("should return an array of contacts when contacts are available", (done) => {
          this.book.addContact("Alice", "111-111-1111", "baker@gmail.com")
          .then(() => {
              this.book.getContacts()
              .then((contacts) => {
                  expect(contacts.length).toBe(1);
                  done();
              });
          })
          .catch((err) => {
              console.log(err);
              done();
          });
      });
  });

describe("#search methods", () => {

    const zelda = ["Zelda Smith", "000-000-0001", "zelda@gmail.com"];
    const snake = ["Solid Snake", "000-000-0011", "snake@gmail.com"];
    const magus = ["Magus Jonson", "000-000-0111", "magus@gmail.com"];
    const alloy = ["Alloy Brock", "000-000-1111", "alloy@gmail.com"];


  describe("#iterativeSearch()", () => {

    
    it("should return null when called with an empty array", () => {
        expect(this.book.iterativeSearch([], "Alloy")).toBeNull();
    });

    it("should return null when contact is not found", (done) =>{
        this.book.addContact(...zelda)
        .then(() => {
            this.book.getContacts()
            .then((contacts) => {
                expect(this.book.iterativeSearch(contacts, "Alloy Blake")).toBeNull();
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        });
    });

    it("should return the contact if found", (done) => {
        this.book.addContact(...alloy)
        .then(() => {
            this.book.addContact(...magus)
            .then(() => {
                this.book.getContacts()
                .then((contacts) => {
                    let contact = this.book.iterativeSearch(contacts, "Magus Jonson");
                    expect(contact.name).toBe("Magus Jonson");
                    expect(contact.phone).toBe("000-000-0111");
                    expect(contact.email).toBe("magus@gmail.com");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });
  });

  describe("#binarySearch()", () => {
      function sort(contacts){
          return contacts.sort((a, b) => {
              return contacts.sort((a, b) => {
                  if(a.name > b.name) return 1;
                    else if(a.name < b.name) return -1;
                    else return 0;
              });
            })
          }

          it("should return null when called with an empty array", () => {
              expect(this.book.binarySearch([], "Alloy Brock")).toBeNull();
          });

          it("should return null when contact is not found", (done) => {
            this.book.addContact(...zelda)
            .then(() => {
                this.book.getContacts()
                .then((contacts) => {
                    expect(this.book.binarySearch(sort(contacts), "Alloy Brock")).toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
          });
      
          it("should return the contact if found", (done) => {
              this.book.addContact(...alloy).then(() => {
                this.book.addContact(...magus).then(() => {
                    this.book.addContact(...zelda).then(() => {
                      this.book.addContact(...snake).then(() => {
                          this.book.getContacts().then((contacts) => {
                            let contact = this.book.binarySearch(sort(contacts), "Magus Jonson");
                            expect(contact.name).toBe("Magus Jonson");
                            expect(contact.phone).toBe("000-000-0111");
                            expect(contact.email).toBe("magus@gmail.com");
                            done();                            
                          })
                          .catch((err) => {
                              console.log(err);
                              done();
                          });
                      });
                    });
                });
              });
          });
  });

  describe("#search()", () => {
      it("should return null when a contact was not found", (done) => {
          this.book.addContact(...zelda)
          .then(() => {
              this.book.search("Solid Sanke")
              .then((contact) => {
                  expect(contact).toBeNull();
                  done();
              })
              .catch((err) => {
                  console.log(err);
                  done();
              });
          });;
      });

      it("should return the contact when found", (done)=> {
          this.book.addContact(...snake)
          .then(() => {
              this.book.search("Solid Snake")
              .then((contact) => {
                expect(contact).not.toBeNull();
                expect(contact.name).toBe("Solid Snake");
                expect(contact.phone).toBe("000-000-0011");
                expect(contact.email).toBe("snake@gmail.com");
                done();
              })
              .catch((err) => {
                  console.log(err);
                  done();
              });
          });
      });
  });
});


describe("#delete()", () => {

    it("should not remove any contacts that do not match the ID passed", (done) => {
        this.book.addContact("Rick Deckard", "000-000-0000", "null@null.com")
        .then(() => {
            this.book.getContacts()
            .then((contacts) => {
                expect(contacts[0].name).toBe("Rick Deckard");
                expect(contacts.length).toBe(1);
                this.book.delete(99)
                .then(() => {
                    this.book.getContacts()
                    .then((contacts) => {
                        expect(contacts.length).toBe(1);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });
    });

    it("should remove the contact that matches the ID passed", (done) => {
        this.book.addContact("Rick Deckard", "000-000-0000", "null@null.com")
        .then((contact) => {
            this.book.getContacts()
            .then((contacts) => {
                expect(contacts[0].name).toBe("Rick Deckard");
                expect(contacts.length).toBe(1);
                this.book.delete(contact.id)
                .then(() => {
                    this.book.getContacts()
                    .then((contacts) => {
                        expect(contacts.length).toBe(0);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });
    });
});


})