let currentEntryID = undefined;

function onLoad() {
	const entryDiv = document.createElement('div');
	entryDiv.setAttribute('id', "entry-1");
	entryDiv.classList.add('entry');
	entryDiv.setAttribute('onclick', 'getEntry()');

	addEntry();
	adjustSidebarHeight();

	// event to change title name for entries
	document.getElementById('title-input').addEventListener("keyup", ({ key }) => {
		if (currentEntryID === undefined) return;
		let noteTitle = document.getElementById('title-input');
		const entry = entriesArr.find(entry => currentEntryID === entry.id);
		if (key === "Enter") {
			if (noteTitle.value != entry.title) {
				noteTitle.blur();
				entry.title = noteTitle.value;
				let sidebarEntryTitle = document.querySelector(`#${currentEntryID} .title`);
				sidebarEntryTitle.textContent = noteTitle.value;
			}
		}
	});
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

	// creates entry object
	let entry = {
		id: entryID,
		title: title,
		date: fulldate,
		content: p,
		default: true,
	}
	// adds to array
	entriesArr.push(entry);

	const entries = document.getElementById('entries');
	entries.insertBefore(entryDiv, entries.firstChild);

	adjustSidebarHeight();
}

function getEntry(event) {
	currentEntryID = event.id;

	const entry = entriesArr.find(entry => currentEntryID === entry.id);
	let noteTitle = document.getElementById('title-input');
	noteTitle.value = entry.title;
	let entryDate = entry.date;
	let screen = document.getElementById('subtitle');
	screen.textContent = entry.date;

}

