import { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  let history = useNavigate();

  // declare temp state of note
  const [note, setnote] = useState({
    _id: "",
    ntitle: "",
    ndescription: "",
    ntag: "",
  });

  // destructur from context
  const { notes, allNotes, noteEditing } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      allNotes();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (noteCurr) => {
    ref.current.click();

    const tempTitle = noteCurr.title.toString();
    const tempDescription = noteCurr.description.toString();
    const tempTag = noteCurr.tag.toString();
    const tempID = noteCurr._id.toString();

    setnote({
      _id: tempID,
      ntitle: tempTitle,
      ndescription: tempDescription,
      ntag: tempTag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // edit note in the API
    const tempTitle = note.ntitle.toString();
    const tempDescription = note.ndescription.toString();
    const tempTag = note.ntag.toString();
    const tempID = note._id.toString();
    noteEditing(tempID, tempTitle, tempDescription, tempTag);
    props.showAlert("Updated Successfully!", "success");
    refClose.current.click();
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: [e.target.value] });
  };

  const ref = useRef("");
  const refClose = useRef("");

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ntitle"
                    name="ntitle"
                    value={note.ntitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ndescription"
                    name="ndescription"
                    value={note.ndescription}
                    onChange={onChange}
                    minLength={10}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ntag"
                    name="ntag"
                    value={note.ntag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.ntitle.toString().length < 5 ||
                  note.ndescription.toString().length < 10
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4 d-flex justify-content-center">
        <h3>Your iNotez</h3>
        <div className="container">{notes.length === 0 && "No notes to display"}</div>
      </div>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              showAlert={props.showAlert}
              updateNote={updateNote}
              note={note}
            />
          );
        })}
    </>
  );
}
