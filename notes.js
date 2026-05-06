const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// CREATE
router.post("/", async (req, res) => {
  try {
    const text = req.body.text?.trim();

    if (!text) {
      return res.status(400).json({ message: "Note text is required" });
    }

    const newNote = new Note({ text });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ date: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const text = req.body.text?.trim();

    if (!text) {
      return res.status(400).json({ message: "Note text is required" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true, runValidators: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
