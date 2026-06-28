'use client'
import { useState, useEffect } from "react";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  //editing existing note
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchNotes = async () => {
    const response = await fetch('/api/notes');
    const data = await response.json();
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  //delete anote
  const deleteNote = async (id) => {
    const response = await fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      fetchNotes()
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please enter both title and content');
      return;
    }
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content })
    });
    if (response.ok) {

      setTitle('');
      setContent('');
      fetchNotes();
    }


  };
  //editing note
  const startEdit = (note) => {
    setEditingId(note._id);
    setEditingTitle(note.title);
    setEditContent(note.content);
  };
  //cancel editing -clear form
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
    setEditContent('');
  };
  //save the edited note
  const updateNote = async (e) => {
  e.preventDefault();
  
  if (!editingTitle.trim() || !editContent.trim()) {
    alert('Please enter both title and content');
    return;
  }
  
  const response = await fetch(`/api/notes/${editingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: editingTitle,
      content: editContent
    })
  });
  
  if (response.ok) {
    // Clear edit state
    setEditingId(null);
    setEditingTitle('');
    setEditContent('');
  
    fetchNotes();
  }
};
  return (

    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <div>
        <form className="mb-6" onSubmit={editingId ? updateNote : handleSubmit}>
          <input type="text"
            placeholder="Note title"
            value={editingId ? editingTitle : title}
            onChange={(e) => {
              if (editingId) {
                setEditingTitle(e.target.value);
              } else {
                setTitle(e.target.value);
              }
            }}
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea
            placeholder="Note content"
            value={editingId ? editContent : content}
            onChange={(e) => {
              if (editingId) {
                setEditContent(e.target.value);
              } else {
                setContent(e.target.value);
              }
            }}
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
          <button
            type="submit"
            className={`text-white px-4 py-2 rounded transition ${editingId ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {editingId ? '💾 Save Changes' : 'Add Note'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="space-y-4">
        {
          notes.map((note) => (
            <div key={note._id} className="border p-4 rounded shadow flex flex-col">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600">{note.content}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => startEdit(note)}
                  className=" hover:bg-blue-600 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition flex items-center"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="hover:bg-blue-600 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition flex items-center"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
}
