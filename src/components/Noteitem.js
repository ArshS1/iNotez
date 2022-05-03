import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
  const { note, updateNote } = props;
  const context = useContext(noteContext);

  // destructur from context
  const { noteDeleting } = context;

  const deleteHandler = (note) => {
    noteDeleting(note._id);
  };

  return (
    <div className="row col-md-3 mx-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              noteDeleting(note._id);
              props.showAlert("Deleted Successfully!", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-file-pen mx-5"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}