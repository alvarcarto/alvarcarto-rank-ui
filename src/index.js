import React from 'react';
import { JunctionNavigation } from 'react-junctions'
import AppJunctionTemplate from './router'
import ReactDOM from 'react-dom';

// Instead of rendering `<App>` directly, it will be rendered by
// `<JunctionNavigation>`.
ReactDOM.render(
  <JunctionNavigation root={AppJunctionTemplate} />,
  document.getElementById('root')
)