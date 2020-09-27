const notesCtrl = {}

const Note = require('../models/Note')

notesCtrl.renderNoteForm = (req,res) => {
    //console.log(req.user)
    res.render('notes/new-note');   
}

notesCtrl.createNewNote = async (req,res) => {
    //console.log(req.body)
    const {title, description}= req.body;
    const newNote = new Note({title, description});
    //console.log(newNote)
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'note added Successfully');
    //res.send('Created!!')
    res.redirect('/notes')
}

notesCtrl.renderNotes = async (req,res) => {
    //res.send('render notes')
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes', { notes })
}

notesCtrl.renderEditForm = async (req,res) => {
    const note = await Note.findById(req.params.id)
    //console.log(note)
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', { note });
}

notesCtrl.updateNote = async (req,res) => {
    //const a=await Note.findById(req.params.id)
    //console.log(req.body)    
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note Uptaded Successfully'); 
    //res.send('Update note')
    res.redirect('/notes')
}

notesCtrl.deleteNote = async (req,res) => {
    //res.send('Deleting note')
    await Note.findByIdAndDelete(req.params.id)
    //console.log(req.params.id)
    //res.send('DEleting note')
    req.flash('success_msg', 'Note Deleted Successfully'); 
    res.redirect('/notes')
}

module.exports= notesCtrl;