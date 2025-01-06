let store = Immutable.Map({
  curiosityData: {},
  opportunityData: {},
  spiritData: {},
});

//creating a variable finalStore which becomes immutable after data is fetched from the api
let finalStore;

// // add our markup to the page
const root = document.getElementById("root");

const updateStore = (newState) => {
  finalStore = store.merge(newState);
  render(root, finalStore);
};

const render = async (root, state, rover) => {
  root.innerHTML = App(state, rover);
};

// create content
const App = (state, rover) => {
  return `
        <header></header>
        <main>
            <section>
                <h1>Welcome To Nasa</h1>
                <ul>
                <li onclick='curiosityFun(event)'>Curiosity</li>
                <li onclick='opportunityFun(event)'>Opportunity</li>
                <li onclick='spiritFun(event)'>Spirit</li>
            </ul> 
                ${RoverImage(state, rover)}
            </section>
        </main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

function curiosityFun(event) {
  render(root, finalStore, event.target.textContent);
}

function opportunityFun(event) {
  render(root, finalStore, event.target.textContent);
}

function spiritFun(event) {
  render(root, finalStore, event.target.textContent);
}

// // ------------------------------------------------------  COMPONENTS

//Another HOF that renders UI elements.
function renderUI(callback, launch, landing, status, recent, imgUrl) {
  return callback(launch, landing, status, recent, imgUrl);
}

function renderLayout(launch, landing, status, recent, imgUrl) {
  return `
        <p>Launch Date: ${launch}</p>
        <p>Landing Date: ${landing}</p>
        <p>Status: ${status}</p>
        <p>Recent Available Photo's Date: ${recent}</p>
        <br>
        <img src=${imgUrl} style='width: 200px; height: 200px'>
        `;
}

// // Example of a pure function that renders infomation requested from the backend
const RoverImage = (state, rover) => {
  if (finalStore === undefined) {
    fetchRover();
    return `<p>...Loading Rover's Data</p>`;
  } else {
    const roversData = [
      { name: "Curiosity", key: "curiosityData" },
      { name: "Opportunity", key: "opportunityData" },
      { name: "Spirit", key: "spiritData" },
    ];

    let result = `<p>Loading Complete. Click the button to see the images of rovers you want.</p>`;
    roversData.map(({ name, key }) => {
      if (rover === name) {
        const launch = state.get(key).latest_photos[0].rover.launch_date;
        const landing = state.get(key).latest_photos[0].rover.landing_date;
        const status = state.get(key).latest_photos[0].rover.status;
        const recent = state.get(key).latest_photos[0].earth_date;
        const imgUrl = state.get(key).latest_photos[0].img_src;

        result = renderUI(
          renderLayout,
          launch,
          landing,
          status,
          recent,
          imgUrl
        );
      }
    });

    return result;
  }
  // } else if (rover === 'Curiosity') {
  //     const launch = state.get('curiosityData').latest_photos[0].rover.launch_date
  //     const landing = state.get('curiosityData').latest_photos[0].rover.landing_date
  //     const status = state.get('curiosityData').latest_photos[0].rover.status
  //     const recent = state.get('curiosityData').latest_photos[0].earth_date
  //     const imgUrl = state.get('curiosityData').latest_photos[0].img_src
  //     return renderUI(renderLayout,launch, landing, status, recent, imgUrl)

  // } else if (rover === 'Opportunity') {
  //     const launch = state.get('opportunityData').latest_photos[0].rover.launch_date
  //     const landing = state.get('opportunityData').latest_photos[0].rover.landing_date
  //     const status = state.get('opportunityData').latest_photos[0].rover.status
  //     const recent = state.get('opportunityData').latest_photos[0].earth_date
  //     const imgUrl = state.get('opportunityData').latest_photos[0].img_src
  //     return renderUI(renderLayout,launch, landing, status, recent, imgUrl)
  // } else if (rover === 'Spirit') {
  //     const launch = state.get('spiritData').latest_photos[0].rover.launch_date
  //     const landing = state.get('spiritData').latest_photos[0].rover.landing_date
  //     const status = state.get('spiritData').latest_photos[0].rover.status
  //     const recent = state.get('spiritData').latest_photos[0].earth_date
  //     const imgUrl = state.get('spiritData').latest_photos[0].img_src
  //     return renderUI(renderLayout,launch, landing, status, recent, imgUrl)
  // } else {
  //     return `<p>Loading Complete. Click the button to see the images of rovers you want.</p>`
  // }
};

// // ------------------------------------------------------  API CALLS

// // Example API call
const fetchRover = () => {
  console.log("entering this");
  fetch(`http://localhost:3000/roversData`)
    .then((res) => res.json())
    .then((data) => updateStore(data));
};
