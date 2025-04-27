import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const inputRef = useRef < HTMLInputElement > null;

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/fetchAllTasks");
      setNotes(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;
    setAdding(true);
    try {
      const res = await axios.post("http://localhost:5000/add", {
        task: newNote,
      });
      const addedTask = { task: newNote };
      setNotes((prev) => [...prev, addedTask]);
      setNewNote("");
      inputRef.current?.focus();
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setAdding(false);
      fetchNotes();
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-f-screen flex items-center justify-center w-screen ">
      <div style={{backgroundColor: "#ffffe6" }} className="p-6 rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex items-center mb-4">
          <span className="text-2xl">📝</span>
          <h1 className="text-2xl font-bold ml-2">Note App</h1>
        </div>
        {/* <div className="bg-red-500 text-white p-4">Tailwind is working!</div> */}

        {/* Input */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="New Note..."
            className="flex-1 border rounded-l-md p-2 focus:outline-none"
            // ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
          />
          <button
            onClick={addNote}
            disabled={adding}
            className={`bg-orange-700 text-white px-4 rounded-r-md flex items-center justify-center ${
              adding ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-800"
            }`}
          >
            {adding ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                ➕ <span className="ml-1">Add</span>
              </>
            )}
          </button>
        </div>

        {/* Notes List */}
        <div className="h-64 overflow-y-auto">
          <h2 className="font-semibold mb-2">Notes</h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="h-8 w-8 border-4 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {notes.length === 0 ? (
                <p className="text-gray-400 text-center">No notes yet!</p>
              ) : (
                notes.map((note, index) => (
                  <div key={index} className="border-b py-2 text-gray-700">
                    {note.item || note?.item || "Untitled Note"}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
