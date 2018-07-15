import axios from 'axios';
import processRows from './process-rows';

const googleSheetsConvertor = async (url) => {
    var rows;
    if (url.indexOf('sheets.googleapis.com') > -1) {
        let response = await axios.get(url);
        if (response.data.values) {                    
            rows = response.data.values;
            var record = {},
                tiles = [],
                breaks = [],
                lowerCaseHeaders = true;


            rows.forEach(function (row, index) {
                row.forEach(function (rowItem) {
                    if (rowItem.indexOf("_tile") > -1) {
                        tiles.push(index);
                    }
                    else if (rowItem.indexOf("_break") > -1) {
                        breaks.push(index);
                    }
                })
            })
            record = processRows({tiles,rows,record,breaks,lowerCaseHeaders});
            return record;
        }
        else{
            console.log(error);
        }
    }

};
export default googleSheetsConvertor;