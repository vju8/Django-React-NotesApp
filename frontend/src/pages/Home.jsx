import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import Message from "../components/Message";
import "../styles/Home.css" 


function Home() {
    const [notes, setNotes] = useState([]); 
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState(null);

    // first thing when accessing home page, send get request to get all notes created by a user
    useEffect(() => {
        getNotes();
    }, [])

    // New useEffect for managing messages
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 4000);  // Message will disappear after 4 seconds

            return () => clearTimeout(timer);
        }
    }, [message]);

    // function getNotes to get all user notes
    const getNotes = () => {
        api
            .get("/api/notes/")                                                         // path of api from the backend => "api/" + "notes/"
            .then((res) => res.data)                                                    // fetch data from backend response 
            .then((data) => { setNotes(data); console.log(data) })                      // set data and display to console (for testing)
            .catch((error) => setMessage({ text: error.toString(), type: "error" }));   // catch and display error is any
    };

    // function to delete notes 
    const deleteNote = (id) => {    // delete by id
        api
            .delete(`/api/notes/delete/${id}`)
            .then((res) => {
                if (res.status === 204) {
                    setMessage({ text: "Note deleted successfully!", type: "success" });
                } else {
                    setMessage({ text: "Failed to delete Note.", type: "error" });
                }
                getNotes();
            })
            .catch((error) => setMessage({ text: error.toString(), type: "error" }));
    };

    // function to create notes
    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if(res.status === 201) {
                    setMessage({ text: "Note created successfully!", type: "success" });
                    // Clear the input fields after successful creation
                    setTitle("");
                    setContent("");
                }
                else alert("Failed to create Note.");
                getNotes();
            })
            // .catch((error) => alert(error));
            .catch((error) => setMessage({ text: error.toString(), type: "error" }));
    };

    return (
    
        <div>
            {/* display message based on the message state */}
            <Message message={message?.text} type={message?.type} />

            <div className="create-note-section">
                <h2 className="create-note-title">Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title</label>
                    <br/>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="content">Content</label>
                    <br/>
                    <textarea 
                        id="content" 
                        name="content" 
                        required 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <br/>
                   
                    <input type="submit" value="Create"/>

                </form>
            </div>
            <div className="notes-section">
                <h2>All Notes</h2>
                {/* render note components */}
                {notes.map((note) => (
                    <div className="note">
                        <Note note={note} onDelete={deleteNote} key={note.id}>
                        <div></div>

                        </Note>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home