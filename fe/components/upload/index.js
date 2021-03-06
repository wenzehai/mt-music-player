import { html } from 'https://dev.jspm.io/lit-html';
import Component from '../../lib/component.js';
import { store } from '../../models/index.js';
import { upload } from '../../services/song.js';

let Instance;

export default class AppUpload extends Component {
  static open() {
    const input = Instance.shadowRoot.querySelector('input');
    input.click();
  }

  constructor() {
    super();
    this.state = store.playerState;
    this.changeHandle = this.changeHandle.bind(this);
    Instance = this;
  }

  render() {
    return html`
      <style>
        :host {
          display: none;
        }
      </style>
      <input @change="${this.changeHandle}" type="file" multiple accept="audio/*">
    `;
  }

  changeHandle() {
    const input = this.shadowRoot.querySelector('input');
    upload(input.files);
    input.value = '';
  }
}

customElements.define('app-upload', AppUpload);
