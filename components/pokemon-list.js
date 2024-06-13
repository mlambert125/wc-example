/**
 * A list of Pokemon.
 * 
 * @element pokemon-list
 */
class PokemonList extends HTMLElement {
    /**
     * The list of Pokemon.
     * 
     * @type {Array<{name: string}>}
     */
    pokemon;

    /**
     * Constructor.
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback() {
        this.render();
        this.load();
    }

    /**
     * Renders the element.
     */ 
    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <div id="container">
                <style>
                    #container {
                        height: 500px;
                        overflow-y: auto;
                        border: 1px solid #ccc;
                        box-shadow: 0px 0px 20px #ccc;
                    }
                </style>

                <div id="loading">
                    <style>
                        #loading {
                            margin: auto;
                            margin-top: 250px;
                            text-align: center;
                        }
                    </style>
                    <span>Loading...</span>
                    <progress></progress>
                </div>
                
                <ul id="list">
                    <style>
                        #list {
                            list-style-type: none;
                            opacity: 0;
                            padding: 0;
                            margin: 0;
                            width: calc(100% - 32px);

                            li {
                                border: 1px solid #ccc;
                                margin: 5px;
                                padding: 10px;
                                width: 100%;
                                
                                &:nth-child(even) {
                                    background-color: #eee;
                                }
                            }

                            &.loaded {
                                transition: all 1s ease-in-out;
                                opacity: 1;
                            }
                        }
                    </style>
                </ul>
            </div>`;
    }

    /**
     * Gets the Pokemon.
     */
    async load() {
        const list = this.shadowRoot.getElementById('list');
        // remove all li's
        let li = list.querySelector('li');
        while (li) {
            list.removeChild(li);
            li = list.querySelector('li');
        }

        this.pokemon = null;
        this.shadowRoot.getElementById('loading').style.display = 'block';
        this.shadowRoot.getElementById('list').classList.remove('loaded');

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        this.pokemon = data.results;

        /* sleep to simulate slow load */
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.shadowRoot.getElementById('loading').style.display = 'none';
        this.pokemon.forEach(pokemon => {
            const li = document.createElement('li');
            li.innerText = pokemon.name;
            list.appendChild(li);
        });
        list.classList.add('loaded');
    }
}

customElements.define('pokemon-list', PokemonList);
