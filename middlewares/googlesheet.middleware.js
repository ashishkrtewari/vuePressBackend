import googleSheetsConvertor from '../utils/google-sheets-convertor';
const handleGoogleSheetUpload = async (req, res) => {
    var url = req.body.url;
    console.log(url)
    let data = await googleSheetsConvertor(url);
    res.json(data);
}
export default handleGoogleSheetUpload;