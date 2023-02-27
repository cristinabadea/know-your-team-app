/** @format */

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "myTeam.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employees = [];
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the Manager's name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the Manager's id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the Manager's email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is the Manager's office number?",
      name: "officeNumber",
    },
  ])
  .then((response) => {
    const newManager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    // add the new Manager object to your array of employees
    employees.push(newManager);

    promptForNextEmployee();
  });

const promptForNextEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseEmployee",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then((response) => {
      if (response.chooseEmployee == "Engineer") {
        promptForEngineer();
      } else if (response.chooseEmployee == "Intern") {
        promptForIntern();
      } else {
        buildPage();
      }
    });
};

const promptForEngineer = () => {
  inquirer
    .prompt([
      //engineer questions
      {
        type: "input",
        message: "What is the Engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the Engineer's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the Engineer's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the Engineer's GutHub username?",
        name: "github",
      },
    ])
    .then((response) => {
      // create a new Engineer object using the user's responses
      const newEngineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      // add the new Engineer object to your array of employees
      employees.push(newEngineer);
      // call the function to prompt the user for the next employee
      promptForNextEmployee();
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the Intern's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the Intern's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the Intern's current school?",
        name: "school",
      },
    ])
    .then((response) => {
      const newIntern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      // add the new Intern object to your array of employees
      employees.push(newIntern);
      // call the function to prompt the user for the next employee
      promptForNextEmployee();
    });
};

const buildPage = () => {
  fs.writeFile("myTeam.html", render(employees), (err) => {
    err ? console.error(err) : console.log("Check the new HTML file!");
  });
};
