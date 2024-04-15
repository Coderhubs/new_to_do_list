#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const createTodo = async () => {

    console.log(chalk.italic.yellowBright("\n\t WELCOME TO SIMRA TO_DO_APP!\n"));

    let taskList: any[] = [];

    const addTask = async () => {
        while (true) {

            let { task } = await inquirer.prompt
                ([
                    {

                        name: "task",
                        type: "input",
                        message: chalk.bold.blueBright("what do u want to add ?"),                    },

                ]);

            taskList.push(task);
            console.log(task);


            let { addMore } = await inquirer.prompt
                ([
                    {
                        name: "addMore",
                        type: "confirm",
                        message: chalk.italic.bgCyanBright.blackBright("Do you want to add more task?"),
                    },
                ]);


            if (!addMore) {
                break;
            }

        }
        
    };

    await addTask();

    const showList = async () => {
        taskList.forEach((task , index) => {
            console.log(`${index + 1 } ${task}`);

        });
    };

    const updatelist = async () => {
        let {confirm} = await inquirer.prompt([
            {
                name: "confirm",
                type: "confirm",
                message:chalk.bold .greenBright("Do you want to update your list?"),
            },

        ]);

        if (!confirm) {
            showList();

        } else {
            let { update } = await inquirer.prompt([
                {
                    name: "update",
                    type: "list",
                    choices: ["Add task", "Delete task", "Exit"],
                    message:chalk.italic.magentaBright ("Select your options"),
                },

            ]);

            if (update === "Add task") {
                await addTask();
                console.log(chalk.bold.greenBright("Task added!"));
                

                showList();

            } else if (update === "Delete task") {
                const doneTask = async () => {
                    let { taskDone } = await inquirer.prompt([{
                        name: "taskDone",
                        type: "list",
                        choices: taskList,
                        message: chalk.bold.redBright("Select the task you have done."),
                    },
                    ]);

                    let index = taskList.indexOf(taskDone);
                    taskList.splice(index, 1);

                    if (index === -1) {
                        console.log(chalk.bgCyan.italic("The list is Empty!"));

                    } else {
                        console.log(chalk.bgBlackBright.greenBright(`${taskDone} DONE! `));

                        showList();
                    }
                };

                await doneTask();
            } else if (update === "Exit") {
                await showList();
                console.log(chalk.italic.magenta("GOOD BYE!"));

            }
        }
    };



    await updatelist();
};

createTodo();



