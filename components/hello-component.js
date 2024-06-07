/**
 * Hello component
 * 
 * @element hello-component
 */
class HelloComponent extends HTMLElement {
    /**
     * The name.
     * 
     * @type {Array<string>}
     */
    static get observedAttributes() {
        return ['name'];
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
            case 'name':
                const nameElement = this.shadowRoot.getElementById('name');
                if (nameElement) {
                    nameElement.innerText = newValue;
                }
                break;
        }
    }

    /**
     * Renders the element.
     */
    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <style>
                h1 {
                    color: red;
                }
            </style>
            <h1>Hello, <span id="name">${this.getAttribute('name')}</span></h1>
        `;
    }
} 

customElements.define('hello-component', HelloComponent);