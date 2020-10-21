const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];
let isThereAManager = false;


// Start the application
function start() {
    inquirer    
        .prompt([
        {
            type: "list",
            name: "jobType",
            message: "What type of employee are you?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Done"         
            ]
        }
    
        ])
        .then(answers => {
            if(answers.jobType === "Engineer"){
                addEngineer();
            } 
            else if(answers.jobType === "Manager"){
                if (isThereAManager === false) {
                    isThereAManager = true;
                    addManager();
                } else {
                    console.log("A manager has already been Hired. Please enter another job type.");
                    start();
                }
            }
            else if(answers.jobType === "Intern"){
                addIntern();
            }
            else{
                end();
            }        
        });
    }
    function addManager() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "mName",
                message: "What is the manager's name?",
                validate: async(input) => {
                    if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                        return "The employee's name must only contain of more then 1 letters and spaces!"; 
                    }
                        return true;
                }
            },
            {
                type: "input",
                name: "mID",
                message: "What is the manager's ID?",
                validate: async (input) => {
                    if(!input.match(/^[0-9]+$/)) {
                        return "Please enter a number";
                    }
                    return true;
                }    
            },
            {
                type: "input",
                name: "mEmail",
                message: "What is your manager's Email",
                validate: async(input) => {
                    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                        return true;
                    }
                    return "Please enter a valid email address";
                }
            },
            
            {
                type: "input",
                name: "mOfficeNumber",
                message: "What is your office number?",
                validate: async (input) => {
                    if(!input.match(/^[0-9]+$/)) {
                        return "Please enter a number";
                    }
                    return true;
                }            
            }
        ])
        .then(answers => {
            console.log(answers);
            const manager = new Manager(answers.mName, answers.mID, answers.mEmail, answers.mOfficeNumber);
            employeeList.push(manager);
            start();
        });
    }
    function addEngineer() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "eName",
                message: "What is the engineer's name?",
                validate: async(input) => {
                    if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                        return "The employee's name must only contain of more then 1 letters and spaces!"; 
                    }
                        return true;
                }
            },
            {
                type: "input",
                name: "eID",
                message: "What is the engineer's ID?",
                validate: async (input) => {
                    if(!input.match(/^[0-9]+$/)) {
                        return "Please enter a number";
                    }
                    return true;
                }    
            },
            {
                type: "input",
                name: "eEmail",
                message: "What is your engineer's Email",
                validate: async(input) => {
                    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                        return true;
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "eGithub",
                message: "What is the engineer's gitHub?",
                validate: async(input) => {
                if (!input.match(/^[A-Z0-9_]+$/i)) {
                    return "Please enter a valid Github name.)";
                    }
                    return true;
                }
            }
            
        ])
        .then(answers => {
            console.log(answers);
            const engineer = new Engineer(answers.eName, answers.eID, answers.eEmail, answers.eGithub);
            employeeList.push(engineer);
            start();
        });
    }
    function addIntern() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "iName",
                message: "What is the intern's name?",
                validate: async(input) => {
                    if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                        return "The employee's name must only contain of more then 1 letters and spaces!"; 
                    }
                        return true;
                }
            },
            {
                type: "input",
                name: "iID",
                message: "What is the intern's ID?",
                validate: async (input) => {
                    if(!input.match(/^[0-9]+$/)) {
                        return "Please enter a number";
                    }
                    return true;
                }    
            },
            {
                type: "input",
                name: "iEmail",
                message: "What is your intern's Email",
                validate: async(input) => {
                    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                        return true;
                    }
                    return "Please enter a valid email address";
                }
            },
            {
                type: "input",
                name: "iSchool",
                message: "What is the intern's school name?",
                validate: async(input) => {
                    if(!input.match(/^[A-Z][A-Z ]{0,}/i)) {
                        return "Please Enter a valid School Name"; 
                    }
                        return true;
                }
            }
        ])
        .then(answers => {
            console.log(answers);
            const intern = new Intern(answers.iName, answers.iID, answers.iEmail, answers.iSchool);
            employeeList.push(intern);
            start();
        });
    }
    start(); 
    
function end() {
    console.log("End".red);
    fs.writeFileSync(outputPath, render(employeeList), "utf-8");
}