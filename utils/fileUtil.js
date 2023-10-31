const path = require('path');

const checkFile = (files) => {
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

module.exports = { checkFile };
