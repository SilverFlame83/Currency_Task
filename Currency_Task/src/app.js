import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { audPage } from './views/aud.js';
import { bgnPage } from './views/bgn.js';
import { cadPage } from './views/cad.js';
import { chfPage } from './views/chf.js';
import { eurPage } from './views/eur.js';
import { homePage } from './views/home.js';
import { nzdPage } from './views/nzd.js';


const main = document.querySelector('main');

page('/', decorateContex, homePage);
page('/eur', decorateContex, eurPage);
page('/aud', decorateContex, audPage);
page('/cad', decorateContex, cadPage);
page('/chf', decorateContex, chfPage);
page('/nzd', decorateContex, nzdPage);
page('/bgn', decorateContex, bgnPage)

page.start();

function decorateContex(ctx, next) {
    ctx.render = (content) => render(content, main);

    next();
}