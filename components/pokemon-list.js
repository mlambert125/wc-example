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
     * The attributes to observe.
     * 
     * @returns {string[]}
     */
    static get observedAttributes() {
        return [];
    }

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
        this.getPokemon();
    }

    /**
     * Called when an attribute changes.
     * 
     * @param {string} name The name of the attribute.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
        }
    }

    /**
     * Renders the element.
     */ 
    render() {
        if (!this.pokemon) {
            this.shadowRoot.innerHTML = /*html*/`
                <span>Loading...</span>
                <progress></progress>
            `;
        } else {
            this.shadowRoot.innerHTML = /*html*/`
                <style>
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        border: 1px solid #ccc;
                        margin: 5px;
                        padding: 10px;
                    }
                </style>
                <ul>
                    ${this.pokemon.map(pokemon => /*html*/`
                        <li>${pokemon.name}</li>
                    `).join('')}
                </ul>
                
            `;
        }
    }

    /**
     * Gets the Pokemon.
     */
    async getPokemon() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        this.pokemon = data.results;

        /* sleep for 2 seconds to simulate slow load */
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.render();
    }
}

customElements.define('pokemon-list', PokemonList);
