"use strict";

class DamienHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Damien's Header</h1>`;
  }
}
customElements.define('damien-header', DamienHeader);