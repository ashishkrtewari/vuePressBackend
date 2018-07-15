import handleUpload from "../middlewares/excel.middleware";
import handleGoogleSheetUpload from "../middlewares/googlesheet.middleware";

const uploadRoutes = app => {
  app.post("/api/upload", handleUpload);
  app.post("/api/upload/googlesheetupload", handleGoogleSheetUpload);
};
export default uploadRoutes;