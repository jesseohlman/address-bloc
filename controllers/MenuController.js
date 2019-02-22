const inquirer = require('inquirer');

module.exports =  class MenuController {
    constructor(){
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below: ",
                choices: [
                    "Add new contact",
                    "Display today's date",
                    "Exit"
                ]
            }
        ];
        this.contacts = [];
    }

    main(){
       console.log('Welcom to AddressBloc!');
       inquirer.prompt(this.mainMenuQuestions).then((response) => {
           switch(response.mainMenuChoice){
               case "Add new contact":
                    this.addContact();
                    break;
                case "Exit":
                    this.exit();
                    break;
                case "Display today's date":
                    this.getDate();
                default:
                    console.log("Invalid Input");
                    this.main();
           }
       })
       .catch((err) => {
           console.log(err);
       })
    }

    clear(){
        console.log("\x1Bc");
    }

    exit(){
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }

    addContact(){
        this.clear();
        console.log('addContact called');
        this.main();
    }

    getDate(){
        var date = new Date();
        console.log(date);
    }

    getContactCount(){
        return this.contacts.length;
    }
}