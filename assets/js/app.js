//variables
const noteList = document.querySelector('#note-list')
const button = document.querySelector('#bs')


//event listeners
eventListeners()
function eventListeners(){
    document.querySelector('#form').addEventListener('submit' , newNote)
    
    //remove note
    document.querySelector('#note-list').addEventListener('click' , removeNote)
    
    document.addEventListener('DOMContentLoaded' , localStroageOnLoad)
   
}



//functions
function newNote(e){
    e.preventDefault()
    //acsess to value of note
    const note = document.querySelector('#note').value

    
    //create remove element
    const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
    removeBtn.classList ='remove-note'
    //creat tag li
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    //adding li to note list
    li.appendChild(removeBtn)
    noteList.appendChild(li)
    
    addNoteLocalStroage(note)

    document.querySelector('#note').value = null
}


function removeNote(e){
    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }

//also remove note from local stroage
    removeNoteLocalStroage(e.target.parentElement.textContent)
}

function addNoteLocalStroage(note){
    const notes = getNoteFromLocalStroage()
    notes.push(note)

    localStorage.setItem('notes' , JSON.stringify(notes))
}

function getNoteFromLocalStroage(){
    let notes

    if (localStorage.getItem('notes') === null) {
        notes = [] 
    } else {
        notes = JSON.parse( localStorage.getItem('notes'))
    }
    return notes
}

function localStroageOnLoad(){
    const notes = getNoteFromLocalStroage()
    notes.forEach(function(note){
        const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
    removeBtn.classList ='remove-note'
    //creat tag li
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    //adding li to note list
    li.appendChild(removeBtn)
    noteList.appendChild(li)
    
    });
}

function removeNoteLocalStroage(noteContent){
    let noteDelete = noteContent.substring(0 , noteContent.length - 1)
    const notesFromLS = getNoteFromLocalStroage()

    notesFromLS.forEach(function(note , index)  {
        if (note === noteDelete) {
            notesFromLS.splice(index , 1)
        }
        
    });
    localStorage.setItem('notes' ,JSON.stringify(notesFromLS))
    
}
