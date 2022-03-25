import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex-block align-items-center">
            <h5 className="card-title"> {note.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
            <p className="card-text">{note.description}</p>
            <i
              className="fa fa-trash mx-2 fa-lg"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Succesfully", "success");
              }}
            ></i>
            <i
              className="fa fa-edit mx-2 fa-lg"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
