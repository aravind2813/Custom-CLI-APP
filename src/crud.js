import { readFileData, writeFileData, appendFileData } from "./db.js";

export const createNotes = async (note, tags) => {
    const newNote = {
        tags,
        id: Date.now(),
        content: note
    };
    await appendFileData(newNote);   
    return newNote;
}

export const readNotes = async () => {
    const {notes} = await readFileData();
    return notes;
}   

export const filterNotes = async (filter) => {
    const {notes} = await readFileData();
    return notes.filter( note => note.content.toLowerCase().includes(filter.toLowerCase()));
};

export const deleteNotes = async (id) => {
    const {notes} = await readFileData();
    const match = notes.find(elt => elt.id === id);
    if(match){
        const newNotes = notes.filter((note)=>note.id !== id);
        await writeFileData({notes:newNotes});
        return id;
    }
};

export const deleteAllNotes = async () => {
    return await writeFileData({notes:[]});
} 