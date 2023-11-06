import { jest } from "@jest/globals";

jest.unstable_mockModule('../src/db.js', () => ({
  readFileData: jest.fn(),
  writeFileData: jest.fn(),
  appendFileData: jest.fn(),
}));


const { readFileData, writeFileData, appendFileData } = await import("../src/db.js");
const { createNotes, readNotes, deleteNotes } = await import("../src/crud.js");

beforeEach(() => {
  readFileData.mockClear();
  writeFileData.mockClear();
  appendFileData.mockClear();
});

test("new note", async () => {

  const note = "hello";
  const tags = ["ni", "gy"];
  const data = {
    tags,
    content: note,
    id: Date.now()
  };
  writeFileData.mockResolvedValue(data);
  const results = await createNotes(note, tags);
  expect(results.content).toEqual(data.content);
});

test("get all notes", async() => {
  const allNotes = {notes : ["df", "sdfds", "frgsw"]};
  readFileData.mockResolvedValue(allNotes);
  const results = await readNotes();
  expect(results).toEqual(allNotes.notes);
});

test('remove notes does nothing if id is not found', async () => {
  const notes = [
    { id: 1, content: 'note 1' },
    { id: 2, content: 'note 2' },
    { id: 3, content: 'note 3' },
  ];
  writeFileData.mockResolvedValue(notes);
  const idToRemove = 13;
  const result = await deleteNotes(idToRemove);
  expect(result).toBeUndefined();
});