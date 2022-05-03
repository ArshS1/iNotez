import { useState } from "react";
import noteContext from "./NoteContext";

// note state contains the state of the notes created by the user
const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  // Get all notes
  const allNotes = async () => {
    console.log(localStorage.getItem("token"));
    // API // Adding a new note
    const response = await fetch(`http://localhost:2000/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newNote = await response.json();
    setnotes(newNote);
  };

  // Add note
  const noteAdding = async (title, description, tag) => {
    // API // Adding a new note
    const response = await fetch(`http://localhost:2000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    setnotes(notes.concat(newNote));
  };

  // Delete note
  const noteDeleting = async (id) => {
    // API
    const response = await fetch(
      `http://localhost:2000/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    // return when the id isn't even to an id in the database
    const updatedNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setnotes(updatedNotes);
  };

  // Edit note
  const noteEditing = async (id, title, description, tag) => {
    // API
    const response = await fetch(
      `http://localhost:2000/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();
    console.log(json);

    let editedNotes = JSON.parse(JSON.stringify(notes));

    // logic
    for (let i = 0; i < editedNotes.length; i++) {
      const element = editedNotes[i];
      if (element._id === id) {
        editedNotes[i].title = title;
        editedNotes[i].description = description;
        editedNotes[i].tag = tag;
      }
      break;
    }
    setnotes(editedNotes);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setnotes,
        noteAdding,
        noteDeleting,
        noteEditing,
        allNotes,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
