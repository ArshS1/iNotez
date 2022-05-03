const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// This is ROUTE 1 and it is used to get all notes
// /api/notes/fetchnotes
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    // fetch all the user notes
    const notes = await Note.find({ user: req.user.id });
    // send all the notes as a response
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// This is ROUTE 2 and it is used to add new notes
// /api/notes/newnote
router.post(
  "/addnote",
  fetchUser,
  [
    // title management using express validator
    body("title", "Enter valid title").isLength({ min: 5 }),

    // description checker
    body("description", "Please have at least 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    // check for user's validity
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // return errors in case of bad request
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savingNote = await note.save();
      res.json(savingNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// This is ROUTE 3 and it is used to update notes
// /api/notes/updatenote
router.put(
  // USE PUT CALL when updating
  "/updatenote/:id",
  fetchUser,
  async (req, res) => {
    // check for user's validity
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // return errors in case of bad request
    }

    try {
      const { title, description, tag } = req.body; // destructure
      const newNote = {}; // empty note to update as progression happens

      // check if elements exist
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // check for user's authorization
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found!");
      }

      if (note.user !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      // user is authorized at this point
      // find then note to update
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// This is ROUTE 4 and it is used to delete notes
// /api/notes/deletenote
router.delete(
  // USE PUT CALL when updating
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
    try {
      // check for user's authorization to proceed with deletion
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found!");
      }

      if (note.user !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      // user is authorized at this point
      // find then note to update
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note deleted.", note: note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
    // send the note to the db
  }
);

// send router to be used by other functions
module.exports = router;
