function onLoad(){
    const entryDiv = document.createElement('div');
    entryDiv.setAttribute('id', "entry-1");
    entryDiv.classList.add('entry');
    entryDiv.setAttribute('onclick', 'getEntry()');

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    entryDiv.innerHTML = `
        <div class="header">
            <p class="title">Your first entry!</p>
            <p class="date">${day}-${month}-${year}</p>
        </div>
        <p>Welcome to the journal app! Here we ca...</p>`;

    const entries = document.getElementById('entries');

    entries.appendChild(entryDiv);

    adjustSidebarHeight();
}

function adjustSidebarHeight(){
    const sidebar = document.querySelector('.sidebar');
    const entries = document.getElementById('entries');
    const windowHeight = window.innerHeight;
    const sidebarNavHeight = document.querySelector('.sidebar-nav').offsetHeight;
    const entriesHeight = windowHeight - sidebarNavHeight;
    entries.style.height = entriesHeight + 'px';
}

window.addEventListener('resize', adjustSidebarHeight);

function addEntry(){
    const entryID = 'entry-' + (document.querySelectorAll('.entry').length +1);
    
    const entryDiv = document.createElement('div');
    entryDiv.setAttribute('id', entryID);
    entryDiv.classList.add('entry');
    entryDiv.setAttribute('onclick', 'getEntry()');

    entryDiv.innerHTML = `
        <div class="header">
            <p class="title">New Entry</p>
            <p class="date">Date</p>
        </div>
        <p>Preview</p>`;

    const entries = document.getElementById('entries');

    entries.insertBefore(entryDiv, entries.firstChild);
    
    adjustSidebarHeight();
}