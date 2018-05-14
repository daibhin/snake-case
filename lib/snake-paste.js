'use babel';

import SnakePasteView from './snake-paste-view';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'snake-paste:transform': () => this.transform()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggleString(string) {
    if (string.includes('_')) {
      return string.split('_').map(word => this.capitalize(word)).join('')
    }
    return string.split(/(?=[A-Z])/).map(word => word.toLowerCase()).join('_')
  },

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },

  transform() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let mutatedSelection = this.toggleString(selection)
      atom.clipboard.write(mutatedSelection)
    }
  }

};
