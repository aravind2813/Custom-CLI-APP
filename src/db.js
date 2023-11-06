import fs from "node:fs/promises";
const FILE_PATH = new URL("../db.json", import.meta.url);

export const readFileData = async () => {
    const data = await fs.readFile(FILE_PATH,{encoding:"utf-8"});
    return JSON.parse(data);
};

export const writeFileData = async newData => {
    await fs.writeFile(FILE_PATH,JSON.stringify(newData));
    return newData;
};

export const appendFileData = async (newData) => {
    const data = await readFileData();
    data.notes.push(newData);
    await writeFileData(data);
    return newData;
};
