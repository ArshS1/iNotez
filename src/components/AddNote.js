import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);

  // destructur from context
  const { noteAdding } = context;

  // declare temp state of note
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    const tempTitle = note.title.toString();
    const tempDescription = note.description.toString();
    const tempTag = note.tag.toString();
    noteAdding(tempTitle, tempDescription, tempTag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully!", "success")
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: [e.target.value] });
  };

  return (
    <div className="">
      <h3>Add a Note</h3>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <button
          disabled={
            note.title.toString().length < 5 ||
            note.description.toString().length < 10
          }
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
