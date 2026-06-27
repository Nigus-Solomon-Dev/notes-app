'use client'
import { useState, useEffect } from "react";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fetchNotes = async () => {
    const response = await fetch('/api/notes');
    const data = await response.json();
    setNotes(data);
  };
  useEffect(() => {
    fetchNotes();
  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();
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
    const newNote = {
      id: Date.now(),
      title: title,
      content: content
    }

  };
  return (

    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <input type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >Add Note</button>
        </form>
      </div>

      <div className="space-y-4">
        {
          notes.map((note) => (
            <div key={note._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600">{note.content}</p>

            </div>
          ))
        }

      </div>
    </div>
  );
}
