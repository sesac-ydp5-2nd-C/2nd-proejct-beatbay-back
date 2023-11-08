const path = require('path');

const checkFiles = (files) => {
    let filePaths = [];
    let filePath = null;
    // 파일 정보 유무 확인
    if (files) {
        for (file of files) {
            const { destination, filename } = file;
            filePath = destination.split(path.sep)[1] + path.sep + filename; // 파일명
            // console.log(filePath);
            filePaths.push(filePath);
        }
    }

    filePaths = JSON.stringify(filePaths);
    console.log(filePaths);

    return filePaths;
};

const checkFile = (file) => {
    let filePath = null;
    // 파일 정보 유무 확인
    if (file) {
        const { destination, filename } = file;
        filePath = destination.split(path.sep)[1] + path.sep + filename; // 파일명
    }

    return filePath;
};

module.exports = { checkFiles, checkFile };
