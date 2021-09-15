#!/usr/bin/env node
// modules
let fs = require("fs");
let path = require("path");

// all Files
let help = require("./Commands/help");
let organize = require("./Commands/organize");
let tree = require("./Commands/tree");

// input from console
let inputArr = process.argv.slice(2);
let command = inputArr[0];

//types
let types = {
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

// calling commands
// while running in vsCode
//node main.js "tree" C:\Users\lenovo\Music\Desktop\PP12_2021\Activities\commandLine
//node main.js "organize" C:\Users\lenovo\Music\Desktop\PP12_2021\Activities\commandLine\Commands
//node main.js "help"

// global
// coco help
// coco tree path
// coco organize path
switch (command) {
  case "tree":
    tree.treeCmd(inputArr[1]);
    break;

  case "organize":
    organize.organizeCmd(inputArr[1]);
    console.log("Your Folder is Organized Now :-) ");
    break;

  case "help":
    help.helpCmd();
    break;

  default:
    console.log("Please Enter Correct Command!!!");
    break;
}
