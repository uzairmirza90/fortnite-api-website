//      Api Links
const upcomingApiLink = 'https://fortnite-api.theapinetwork.com/upcoming/get';
const popularApiLink = 'https://fortnite-api.theapinetwork.com/items/popular';


//      Navbar Links to render Data
document.getElementById('upcoming').addEventListener('click', () => renderUpcomingData())
document.getElementById('popular').addEventListener('click', () => renderPopularData())
document.getElementById('home').addEventListener('click', () => renderHome())


//      Function to fetch upcoming api data
const fetchUpcomingApi = async () => {
    try {
        let apiResponse = await fetch(upcomingApiLink)
        let json = await apiResponse.json()
        return json
    } catch (e) {
        console.log(e)
    }
}


//      Function to fetch popular api data
const fetchPopularApi = async () => {
    try {
        let apiResponse = await fetch(popularApiLink)
        let json = await apiResponse.json()
        return json
    } catch (e) {
        console.log(e)
    }
}


//      Function to render Upcoming data from api
async function renderUpcomingData() {
    let apiData = await fetchUpcomingApi()
    let renderHTML = '';
    console.log(apiData)
    const { lastUpdate, lanuage, data } = apiData;
    let first20Elements = data.slice(0, 20)
    first20Elements.map((element, index) => {
        const { item } = element;
        let html = `<div class="card-item">
                        <img src=${item.images.icon} class="card-image">
                        <h4>Name: ${item.name}</h4>
                        <h4>Type: ${item.type}</h4>
                        <h4>Rarity: ${item.rarity}</h4>
                        <h4>Series: ${item.series}</h4>
                        <h4>Upcoming: ${item.upcoming}</h4>
                    </div>`;

        renderHTML += html;
    })

    document.getElementById('card').innerHTML = renderHTML
}


//      Function to render Popular data from api
async function renderPopularData() {
    let apiData = await fetchPopularApi()
    let renderHTML = '';
    const { lastUpdate, lanuage, entries } = apiData;
    entries.map((element, index) => {
        const { name, type, entries } = element
        entries.map((el) => {
            const { name, description, serie, type, images } = el;
            let html = `<div class="card-item">
                            <img src=${images.transparent} class="card-image">
                            <h4>Name: ${name}</h4>
                            <h4>Description: ${description}</h4>
                            <h4>Serie: ${serie}</h4>
                            <h4>Type: ${type}</h4>
                        </div>`;

            renderHTML += html;
        })

        document.getElementById('card').innerHTML = renderHTML
    })
}


//      Function to render Home Data
function renderHome() {
    let html = `<h2>Home</h2>`
    document.getElementById('card').innerHTML = html
}

renderHome()