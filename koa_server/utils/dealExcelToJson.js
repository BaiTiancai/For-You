const nodeXlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

function countryInfo () {
    const countrySheet = getSheetData('../data/全世界各国全称及简称大全(中英对照).xls')[0].data;
    const data = countrySheet.slice(2);

    // 表中下标对应字段
    const toField = {
        0: 'cn_name',
        1: 'en_name',
        2: 'country_code',
        3: 'cn_full_name',
        4: 'en_full_name',
    };

    // 转换国家信息数据
    const countryInfoList = data.map(item => {
        let countryInfoItem = {};
        item.map((result, index) => {
            countryInfoItem[toField[index]] = result
        })
        return countryInfoItem
    })
    console.log(countryInfoList)

    writeJsonFile('./countryInfoList.json', JSON.stringify(countryInfoList))
}

/**
 * 获取表中数据
 * @param {*} excelPath 
 */
function getSheetData (excelPath) {
    return nodeXlsx.parse(path.join(__dirname, excelPath))
}


function writeJsonFile (filename, content) {
    fs.writeFileSync(filename, content, 'utf8')
}

// countryInfo()