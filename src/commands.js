import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createNotes,readNotes,filterNotes,deleteNotes,deleteAllNotes } from './crud.js';
import {start} from "./server.js";

const argv = yargs(hideBin(process.argv))
  .scriptName('note') // Set the script name to 'note'
  .command("new <note>", "creates a new note", (yargs) => {
    return yargs.positional("note", {
      type:"string",
      description:"content of the note"
    })
  }, async (argv) => {
     const tags = argv.tags? argv.tags.split(",") : [];
     const notes = argv.note;
     await createNotes(notes, tags);
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async (argv) => {
    const notes = await readNotes();
    console.log(notes);
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    const filteredNotes = await filterNotes(argv.filter);
    console.log(filteredNotes);
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const id = await deleteNotes(argv.id);
    console.log(id);
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    const notes = await readNotes()
    start(notes, argv.port)
  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await deleteAllNotes();
    console.log("Cleaned");
  })
  .demandCommand(1) // needs atleast one command to be execeuted
  .parse()
