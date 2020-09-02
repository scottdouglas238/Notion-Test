//constructors
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRender");



const employees = [];

inquirer.prompt([
    {
        message: "What is your managers name?",
        name: "name"
    },
    {
        message: "What is your managers id?",
        name: "id"
    },
    {
        message: "What is your managers email?",
        name: "email"
    },
    {
        message: "What is your managers office number?",
        name: "officeNumber"
    },
]).then(function (manager) {
    const newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
    employees.push(newManager);
    console.log(employees)
    addEmployee();
})

function engineerPrompt(){
    return inquirer.prompt([
        {
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            message: "What is your engineer's id?",
            name: "id"
        },
        {
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            message: "What is your engineer's GitHub?",
            name: "github"
        },
    ])
    .then(function (engineer){
        const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
    employees.push(newEngineer);
    console.log(employees)
    addEmployee();
    })
}

function internPrompt(){
    return inquirer.prompt([
        {
            message: "What is your Intern's  name?",
            name: "name"
        },
        {
            message: "What is your Intern's  id?",
            name: "id"
        },
        {
            message: "What is your Intern's  email?",
            name: "email"
        },
        {
            message: "What is your Intern's  school?",
            name: "school"
        },
    ])
    .then(function (intern){
        const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school)
    employees.push(newIntern);
    console.log(employees)
    addEmployee();
    })
}

function addEmployee(){
    return inquirer.prompt([
        {
            type: "list",
            name: "engineerOrIntern",
            message: "Who would like to add to the team?",
            choices: [
                "Engineer",
                "Intern",
                "Quit"]
        },
    ])
            .then(function({ engineerOrIntern }){
                if(engineerOrIntern === "Engineer"){
                    engineerPrompt();
                }else if (engineerOrIntern === "Intern"){
                    internPrompt();
                }else{
                    fs.writeFile("index.html", render(employees), () => {})
                }
            })
}
