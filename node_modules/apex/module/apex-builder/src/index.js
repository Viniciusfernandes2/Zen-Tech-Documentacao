/* eslint-env browser */

import { h, render } from 'inferno';
import { AppView } from './view/app.view';
import './object';
import './string';
import './prop';


render(h(AppView, { props: 'here' }), document.querySelector('.main-app'));

