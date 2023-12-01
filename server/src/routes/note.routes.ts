import { Router } from "express";
import * as note from '../controllers/note.controllers'
const router = Router();

router.post('/', note.createNote);
router.get('/', note.getAllNotes);
router.put('/:id', note.updateNote)
router.delete('/:id', note.deleteNote)

export default router