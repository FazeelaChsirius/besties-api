import { Router } from "express";
import { downloadFile } from "../controller/storage.controller";

const StorageRouter = Router()
StorageRouter.post('/download', downloadFile)

export default StorageRouter