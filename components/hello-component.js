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
                
                if (!nameElement) return;
                nameElement.classList.remove('loaded');

                if (nameElement) {
                    setTimeout(() => {
                        nameElement.innerText = newValue;
                        nameElement.classList.add('loaded');
                    }, 500);
                }
                break;
        }
    }

    /**
     * Renders the element.
     */
    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <h1>
                <style>
                    h1 { color: var(--hello-component-color, red); }
                </style>
                Hello, 
                <span id="name" class="loaded">
                    <style>
                        #name {
                            opacity: 0;
                            transition: opacity 0.25s;

                            &.loaded {
                                opacity: 1;
                            }
                        }
                    </style>
                    ${this.getAttribute('name')}
                </span>
            </h1>
        `;
    }
} 

customElements.define('hello-component', HelloComponent);
