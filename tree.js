// modules
let fs = require("fs");
let path = require("path");

function tree (dirPath){
    if(dirPath === undefined){
        
        treeHelper(process.cwd(),"");
        return;
    }else{
        if(fs.existsSync(dirPath)){
            treeHelper(dirPath,"");
        }else{
            console.log("Please Enter the correct folder path!");
        }
    }
}

function treeHelper(dirPath,indent) {
    // isFile or Not
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile){
        console.log(indent+"|---",path.basename(dirPath));
    }else{
        console.log(indent+"|___",path.basename(dirPath));
        let curDirFiles = fs.readdirSync(dirPath);
        for(let i = 0 ; i < curDirFiles.length ; i++)
            treeHelper(path.join(dirPath,curDirFiles[i]),indent+"\t");
    }
}

module.exports = {
    treeCmd: tree
}