let currentEntryID = undefined;
let currentEntry;

class Note{
	
	id = "";
	title = "";
	date = "";
	content = "";

	constructor(id, title, date, content){
		this.id = id;
		this.title = title;
		this.date = date;
		this.content = content;
	}

	setTitle(string){
		title = string;
	}

	setContent(string){
		content = string;
	}

	getDate(){
		return this.date;
	}

	getContent(){
		return this.content;
	}

	getID(){
		return this.id;
	}

	getTitle(){
		return this.title;
	}

}

function onLoad() {
	const entryDiv = document.createElement('div');
	entryDiv.setAttribute('id', "entry-1");
	entryDiv.classList.add('entry');
	entryDiv.setAttribute('onclick', 'getEntry()');

	addEntry();
	adjustSidebarHeight();
	
	// adding events
	// event to change title name for entries
	document.getElementById('title-input').addEventListener("keyup", ({ key }) => {
		if (currentEntry === undefined) return;
		let noteTitle = document.getElementById('title-input');
		if (key === "Enter") {
			if (noteTitle.value != currentEntry.title) {
				noteTitle.blur();
				currentEntry.title = noteTitle.value;
				let sidebarEntryTitle = document.querySelector(`#${currentEntryID} .title`);
				sidebarEntryTitle.textContent = noteTitle.value; // changes sidebar
			}
		}
	});


	document.getElementById('content-edit').addEventListener('keyup', handleKeyPress);
}

let timeoutId;
function handleKeyPress(){
	clearTimeout(timeoutId); // Clear the previous timeout (if any)
	console.log("Key pressed!");
	timeoutId = setTimeout(() => {
		
		console.log("1.5 seconds of inactivity.");
	}, 1500);
}

function adjustSidebarHeight() {
	const entries = document.getElementById('entries');
	const windowHeight = window.innerHeight;
	const sidebarNavHeight = document.querySelector('.sidebar-nav').offsetHeight;
	const entriesHeight = windowHeight - sidebarNavHeight;
	entries.style.height = entriesHeight + 'px';
}

window.addEventListener('resize', adjustSidebarHeight);

entriesArr = [];

function addEntry() {
	let entriesCount = document.querySelectorAll('.entry').length
	const entryID = 'entry-' + entriesCount;

	const entryDiv = document.createElement('div');
	entryDiv.setAttribute('id', entryID);
	entryDiv.classList.add('entry');

	entryDiv.addEventListener('click', function () {
		getEntry(this);
	});

	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();

	let fulldate = `${day}-${month}-${year}`

	let p = "placeholder";
	let title = "Untitled"

	if (entriesCount === 1) {
		title = "Your first entry!";
		p = `<p>example</p>`;
	}

	entryDiv.innerHTML = `
        <div class="header">
            <p class="title">${title}</p>
            <p class="date">${fulldate}</p>
        </div>
		<div class="content-preview">
        	${p}
		</div>	
		`;

	let xyz = new Note(entryID, title, fulldate, p);
	entriesArr.push(xyz);

	const entries = document.getElementById('entries');
	entries.insertBefore(entryDiv, entries.firstChild);

	adjustSidebarHeight();
}

function getEntry(event) {
	entriesArr.forEach(element => {
		if(element.id === event.id){
			currentEntry = element;
			currentEntryID = currentEntry.id;
			return;
		}
	});

	if (currentEntry === undefined){
		console.log('note is null');		
		return;
	}
	
	let noteTitle = document.getElementById('title-input');
	noteTitle.value = currentEntry.title;
	let entryDate = currentEntry.date; // not used
	let screen = document.getElementById('subtitle');
	screen.textContent = currentEntry.date;

}

