var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);

var mainObj = document.getElementById('main');
var mainElement = document.querySelector('main');

function createModal() {
    var element = document.createElement('div');
    element.classList.add('modal');
    element.innerHTML = `
  <div class="body">
    <div class="controls">
      <button>Close the Info.</button>
    </div>
    <div class="content"></div>
  </div>
  <div class="underlay"></div>`
    return element;
}


function showModal(contentElement) {
    modalContentElement.innerHTML = '';
    modalContentElement.appendChild(contentElement);
    modalElement.classList.add('open');
}

function hideModal() {
    modalElement.classList.remove('open');
}

function loadData(url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            var responseObj = JSON.parse(xhr.responseText);
            done(responseObj);
        } else {
            console.log('error, status code is: ' + xhr.status);
        }
    }
    xhr.send();
}

function loadPeople(done) {
    loadData('https://swapi.co/api/people/', done);
}

function loadPlanet(url, done) {
    loadData(url, done);
}

function renderPeople(people) {
    console.log('rendering persons');

    people.results.forEach(function(person) {
        var sectionObj = document.createElement('section');
        sectionObj.classList.add('person');

        var genderSymbol;
        switch (person.gender) {
            case 'male':
                genderSymbol = '♂';
                break;
            case 'female':
                genderSymbol = '♀';
                break;
            default:
                genderSymbol = '?¿';
                break;
        }


        sectionObj.innerHTML = `
        <header>
          <h1>
            ${person.name}
            <span class="gender" title="gender: ${person.gender}">${genderSymbol}</span>
          </h1>
        </header>
                <button>Details of Home World</button>
        <div>
          <li>
            <span class="label">Birth Year:</span>
            <span class="value">${person.birth_year}.</span>
          </li>
          <li>
            <span class="label">Eye Color:</span>
            <span class="value">${person.eye_color}.</span>
          </li>
          <li>
            <span class="label">Skin Color:</span>
            <span class="value">${person.skin_color}.</span>
          </li>
          <li>
            <span class="label">Hair Color:</span>
            <span class="value">${person.hair_color}.</span>
          </li>
          <li>
            <span class="label">Height:</span>
            <span class="value">${person.height} m.</span>
          </li>
          <li>
            <span class="label">Mass:</span>
            <span class="value">${person.mass} kg.</span>
          </li>
        </div>`;
        sectionObj.querySelector('button')
            .addEventListener('click', function() {
                loadPlanet(person.homeworld, renderPlanet);
            });

        mainElement.appendChild(sectionObj);
    });
};


function renderPlanet(planet) {
    var sectionObj = document.createElement('section');
    showModal(sectionObj);

    sectionObj.innerHTML = `
        <header>
          <h1>
            ${planet.name}
          </h1>
        </header>
        <div>
          <li>
            <span class="label">Climate:</span>
            <span class="value">${planet.climate}.</span>
          </li>
          <li>
            <span class="label">Gravity:</span>
            <span class="value">${planet.gravity}.</span>
          </li>
          <li>
            <span class="label">Terrain:</span>
            <span class="value">${planet.terrain}.</span>
          </li>
          <li>
            <span class="label">Surface Water:</span>
            <span class="value">${planet.surface_water}.</span>
          </li>
          <li>
            <span class="label">Population:</span>
            <span class="value">${planet.population} m.</span>
          </li>
          <li>
            <span class="label">Diameter:</span>
            <span class="value">${planet.diameter} kg.</span>
          </li>
        </div>`;
}

loadPeople(renderPeople);






//Loading New Characters by a next buttom
var nextlist2Obj = document.getElementById('nextlist2');
var nextlist1Obj = document.getElementById('nextlist1');
var nextlist3Obj = document.getElementById('nextlist3');
var nextlist4Obj = document.getElementById('nextlist4');
var nextlist5Obj = document.getElementById('nextlist5');


nextlist1Obj.onclick = function() {
    mainObj.innerHTML = '';
    loadPeople(renderPeople);

}
nextlist2Obj.onclick = function() {
    mainObj.innerHTML = '';
    loadPeople2(renderPeople);

}
nextlist3Obj.onclick = function() {
    mainObj.innerHTML = '';
    loadPeople3(renderPeople);

}
nextlist4Obj.onclick = function() {
    mainObj.innerHTML = '';
    loadPeople4(renderPeople);

}
nextlist5Obj.onclick = function() {
    mainObj.innerHTML = '';
    loadPeople5(renderPeople);

}
function loadPeople2(done) {
    loadData('https://swapi.co/api/people?page=2', done);
}

function loadPeople3(done) {
    loadData('https://swapi.co/api/people?page=3', done);
}
function loadPeople4(done) {
    loadData('https://swapi.co/api/people?page=4', done);
}
function loadPeople5(done) {
    loadData('https://swapi.co/api/people?page=5', done);
}

//End next loading