// modules
let fs = require("fs");
let path = require("path");

//types
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize (dirPath){
    let destPath;
    if(dirPath === undefined){
        destPath = process.cwd();
        return;
    }else{
        if(fs.existsSync(dirPath)){
            destPath = path.join(dirPath,"organizedFolder");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }
        }else{
            console.log("Please Enter the correct folder path!");
        }
    }
    organizeHelper(dirPath,destPath);
}

function organizeHelper(src , dest){
   let allFiles = fs.readdirSync(src);

    for(let i = 0 ; i < allFiles.length ; i++){
        //checking that is a file or not
        let isFile = fs.lstatSync(path.join(src,allFiles[i])).isFile();
        
        //if is it File call getCategory fumction
        if(isFile){
            let category = getCategory(allFiles[i]);
            // 1. check this category folder is present or not 
            let folderExist = fs.existsSync(path.join(dest,category));
            if(folderExist){
                //copy file from unOrganized folder to organized folder 
                fs.copyFileSync(path.join(src,allFiles[i]),path.join(dest,category,allFiles[i]));

                // removing copied file
                // fs.unlinkSync(path.join(src,allFiles[i]))
            }else{

                // creating new folder
                let folderPath = path.join(dest,category);
                fs.mkdirSync(folderPath);

                //copy file from unOrganized folder to organized folder
                fs.copyFileSync(path.join(src,allFiles[i]),path.join(folderPath,allFiles[i]));
            
                // removing copied file
                // fs.unlinkSync(path.join(src,allFiles[i]))
            }
        }
        // console.log(category);
    }
}

function getCategory(fName){
    let ext = path.extname(fName).slice(1);

    for(let key in types){
        for(let i = 0 ; i < types[key].length ; i++)
            if(ext === types[key][i])   return key;
    }
    return "others";
}
module.exports = {
    organizeCmd: organize
}