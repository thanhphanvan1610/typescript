import { Request, Response, NextFunction } from "express";
import Note from "../models/note";
import createHttpError from "http-errors";

const createNote = async (req:Request, res:Response, next:NextFunction) => {
    const { title, text } = req.body;
  
    if (!title) {
      return next(createHttpError(400, 'Title required'));
    }
  
    try {
      const newNote = new Note({ title, text });
      const savedNote = await newNote.save();
      return res.status(201).json({ message: savedNote });
    } catch (error) {
      next(error);
    }
  };

const getAllNotes = async(req:Request, res:Response, next:NextFunction) => {

    try {
        const notes = await Note.find({});
        return res.status(200).json(notes);
        
    } catch (error) {
        next(error)
    }
}


const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, text } = req.body;

    try {
        // Validate if 'id' is provided
        if (!id) {
            throw createHttpError(400, 'Required Note ID');
        }

        // Validate if 'title' is provided
        if (!title) {
            throw createHttpError(400, 'Required title');
        }

        // Find and update the note
        const noteUpdated = await Note.findByIdAndUpdate(
            id,
            { title, text },
            { new: true, useFindAndModify: false } // Ensure 'new' option and useFindAndModify are set
        );

        // Check if the note was found and updated
        if (!noteUpdated) {
            throw createHttpError(404, 'Note Not Found');
        }

        // Return success response
        return res.status(200).json({ message: 'Update successful!', payload: noteUpdated });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};



const deleteNote = async(req: Request, res: Response, next:NextFunction) => {
    const {id} = req.params;
    if(!id){
        return next(createHttpError(400, "Required ID Note!"));
    }
    try {
        const note = await Note.findByIdAndDelete(id)
        if(!note){
            return next(createHttpError(404, "Note not found!"));
        }
        return res.status(200).json({message: "Note deleted!"})
        
    } catch (error) {
        next(error)
    }
}

export {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
}