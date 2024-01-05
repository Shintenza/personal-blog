import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

const createUploadsDir = () => {
  const savePath = process.env.STORAGE;
  if (!existsSync(savePath)) {
    mkdirSync(savePath);
  }
};
export default createUploadsDir;
