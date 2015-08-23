import './stylesheets/main.css';

import React from 'react';
import App from './components/App';
import 'array.prototype.findindex';

require('script!../vendor/teamsnap.js');

main();

function main() {


  const app = document.createElement('div');

  document.body.appendChild(app);

  React.render(<App />, app);
}
