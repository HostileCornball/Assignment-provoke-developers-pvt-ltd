const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory storage for user data (replace this with a database in a real application)
const users = [];
const notes = []; // In-memory storage for notes

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Authentication Endpoints

// Create a new user account
app.post('/api/auth/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Add the new user to the in-memory storage
    const newUser = { username, password };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Log in to an existing user account and receive an access token
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the in-memory storage
    const user = users.find(u => u.username === username);

    // Check if the user exists and if the password matches
    if (user && user.password === password) {
        res.status(200).json({ message: 'Login successful', user: { username }, accessToken: 'your_access_token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Note Endpoints

// Get a list of all notes for the authenticated user
app.get('/api/notes', (req, res) => {
    // Return the notes for the authenticated user (replace this with proper authentication logic)
    res.status(200).json({ notes });
});

// Get a note by ID for the authenticated user
app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    // Find the note by ID for the authenticated user (replace this with proper authentication and data retrieval logic)
    const note = notes.find(n => n.id === noteId);

    if (note) {
        res.status(200).json({ note });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

// Create a new note for the authenticated user
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    // Create a new note for the authenticated user (replace this with proper authentication and data storage logic)
    const newNote = { id: Date.now().toString(), title, content };
    notes.push(newNote);

    res.status(201).json({ message: 'Note created successfully', note: newNote });
});

// Update an existing note by ID for the authenticated user
app.put('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

    // Find and update the note by ID for the authenticated user (replace this with proper authentication and data update logic)
    const updatedNoteIndex = notes.findIndex(n => n.id === noteId);

    if (updatedNoteIndex !== -1) {
        notes[updatedNoteIndex] = { id: noteId, title, content };
        res.status(200).json({ message: 'Note updated successfully', note: notes[updatedNoteIndex] });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

// Delete a note by ID for the authenticated user
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    // Find and delete the note by ID for the authenticated user (replace this with proper authentication and data deletion logic)
    const deletedNoteIndex = notes.findIndex(n => n.id === noteId);

    if (deletedNoteIndex !== -1) {
        const deletedNote = notes.splice(deletedNoteIndex, 1);
        res.status(200).json({ message: 'Note deleted successfully', note: deletedNote[0] });
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
