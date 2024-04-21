import fs from "fs";

//Read Text File
let data = [];
let extracredInfo = {}
let keyWords = {
    "email":"@",
    "phoneNumber":[10,13],
    "ZipCode":5
}

const fileProcessor = (inputFilePath, outputFilePath) => {
    //read text file
     const lines = fs.readFileSync(inputFilePath,"utf-8").split('\n');

    //process each Line
    for (const line of lines) 
    {
        emailFilter(line);
        phoneFilter(line);
        ZipCodeFilter(line);
        data.push(extracredInfo)
    }
    console.log("Final Result");
    console.log(data);
    writeFile(data,outputFilePath);

};



//filter Email
const emailFilter = (line) => {
    const emailSymbol = keyWords.email
    const words = line.split(" ");
    words.map(word => {
        if (word.includes(emailSymbol))
        extracredInfo.email=word;
    })

}

//filter Phone
const phoneFilter = (line) => {
    const phoneDigits = keyWords.phoneNumber;
    const words = line.split(" ");

    words.map(word=>{
        if (!isNaN(word) && word.length==phoneDigits[0])
        extracredInfo.phoneNumber=word;
        if (word.includes('-') && word.length==phoneDigits[1])
        extracredInfo.phoneNumber=word;
    })

}

// filterzipCode
const ZipCodeFilter=(line) => {
    const zipDigit = keyWords.ZipCode;
    const words = line.split(" ");
    words.map(word=> {
        if (!isNaN(word) && word.length==5)
        extracredInfo.ZipCode=word;
    })
    
}


const writeFile = async (data,outputFilePath)=>{
    await fs.writeFileSync(outputFilePath,JSON.stringify(data))
}


//use Func

fileProcessor("input.txt","output.txt");