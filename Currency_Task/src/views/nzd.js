import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const nzdTemplate = (data) => html `
	<section class="welcome">
            <div class="nzd-welcome">
            <p class="nzd-title"> NZD Currency rate</p>
            <article class="card">
            <div class="group-name"> Group1 ${data.map((d)=> html`${calcOne(d)}`)}</div>
            <div class="count">Count: ${getCountOne(data)}</div>
            </article>
            <article class="card">
            <div class="group-name"> Group2 ${data.map((d)=> html`${calcTwo(d)}`)}</div>
            <div class="count">Count: ${getCountTwo(data)}</div>
            </article>
            <article class="card">
            <div class="group-name"> Group3 ${data.map((d)=> html`${calcThree(d)}`)}</div>
            <div class="count">Count: ${getCountThree(data)}</div>
            </article>
    </section>
`;

function getCountOne(data){
    let count = 0;
    for(let d of Object.entries(data)){
        const newPop = d.pop()
        if(newPop.value < 1){
            count ++;
        };
    }
    return html`${count}`;
};

function getCountTwo(data){
    let count = 0;
    for(let d of Object.entries(data)){
        const newPop = d.pop()
        if(newPop.value >= 1 && newPop.value <= 1.5){
            count ++;
        };
    }
    return html`${count}`;
};
function getCountThree(data){
    let count = 0;
    for(let d of Object.entries(data)){
        const newPop = d.pop()
        if(newPop.value >= 1.5){
            count ++;
        };
    }
    return html`${count}`;
};

function calcOne(data) {
    if (data.value < 1) {
        return html `<p>${data.name} : ${data.value}</p>`;
    }
}

function calcTwo(data) {
    if (data.value >= 1 && data.value <= 1.5) {
        return html `<p>${data.name} : ${data.value}</p>`;
    }
}
function calcThree(data) {
    if (data.value >= 1.5) {
        return html `<p>${data.name} : ${data.value}</p>`;
    }
}

export async function nzdPage(ctx) {
    const nzdUsd = await getCurency('/nzd/usd');
    const usdNzd = await getCurency('/usd/nzd');
    const nzdToUsd = 'NZD-USD';
    const usdToNzd = 'USD-NZD';

    const nzdEur = await getCurency('/nzd/eur');
    const eurNzd = await getCurency('/eur/nzd');
    const nzdToEur = 'NZD-EUR';
    const eurToNzd = 'EUR-NZD';

    const nzdAud = await getCurency('/nzd/aud');
    const audNzd = await getCurency('/aud/nzd');
    const nzdToAud = 'NZD-AUD';
    const audToNzd = 'AUD-NZD';

    const nzdCad = await getCurency('/nzd/cad');
    const cadNzd = await getCurency('/cad/nzd');
    const nzdToCad = 'NZD-CAD';
    const cadToNzd = 'CAD-NZD';

    const nzdChf = await getCurency('/nzd/chf');
    const chfNzd = await getCurency('/chf/nzd');
    const nzdToChf = 'NZD-CHF';
    const chfToNzd = 'CHF-NZD';

    const nzdBgn = await getCurency('/nzd/bgn');
    const bgnNzd = await getCurency('/bgn/nzd');
    const nzdToBgn = 'NZD-BGN';
    const bgnToNzd = 'BGN-NZD';


    const data = [];
    data.push(
        { name: nzdToUsd, value: nzdUsd.usd.toFixed(1) }, 
        { name: usdToNzd, value: usdNzd.nzd.toFixed(1) },
        { name: nzdToEur, value: nzdEur.eur.toFixed(1) }, 
        { name: eurToNzd, value: eurNzd.nzd.toFixed(1) },
        { name: nzdToAud, value: nzdAud.aud.toFixed(1) }, 
        { name: audToNzd, value: audNzd.nzd.toFixed(1) },
        { name: nzdToCad, value: nzdCad.cad.toFixed(1) }, 
        { name: cadToNzd, value: cadNzd.nzd.toFixed(1) },
        { name: nzdToChf, value: nzdChf.chf.toFixed(1) }, 
        { name: chfToNzd, value: chfNzd.nzd.toFixed(1) },
        { name: nzdToBgn, value: nzdBgn.bgn.toFixed(1) }, 
        { name: bgnToNzd, value: bgnNzd.nzd.toFixed(1) },
        )

    data.sort((a, b) => a.value - b.value);
   
    ctx.render(nzdTemplate(data));
}