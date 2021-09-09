import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const bgnTemplate = (data) => html `
	<section class="welcome">
            <div class="bgn-welcome">
            <p class="title"> BGN Currency rate</p>
            <article class="bgn-card">
            <div class="group-name"> Group1 ${data.map((d)=> html`${calcOne(d)}`)}</div>
            <div class="count">Count: ${getCountOne(data)}</div>
            </article>
            <article class="bgn-card">
            <div class="group-name"> Group2 ${data.map((d)=> html`${calcTwo(d)}`)}</div>
            <div class="count">Count: ${getCountTwo(data)}</div>
            </article>
            <article class="bgn-card">
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

export async function bgnPage(ctx) {
    const bgnUsd = await getCurency('/bgn/usd');
    const usdBgn = await getCurency('/usd/bgn');
    const bgnToUsd = 'BGN-USD';
    const usdToBgn = 'USD-BGN';

    const bgnEur = await getCurency('/bgn/eur');
    const eurBgn = await getCurency('/eur/bgn');
    const bgnToEur = 'BGN-EUR';
    const eurToBgn = 'EUR-BGN';

    const bgnAud = await getCurency('/bgn/aud');
    const audBgn = await getCurency('/aud/bgn');
    const bgnToAud = 'BGN-AUD';
    const audToBgn = 'AUD-BGN';

    const bgnCad = await getCurency('/bgn/cad');
    const cadBgn = await getCurency('/cad/bgn');
    const bgnToCad = 'BGN-CAD';
    const cadToBgn = 'CAD-BGN';

    const bgnChf = await getCurency('/bgn/chf');
    const chfBgn = await getCurency('/chf/bgn');
    const bgnToChf = 'BGN-CHF';
    const chfToBgn = 'CHF-BGN';

    const bgnNzd = await getCurency('/bgn/nzd');
    const nzdBgn = await getCurency('/nzd/bgn');
    const bgnToNzd = 'BGN-NZD';
    const nzdToBgn = 'NZD-BGN';


    const data = [];
    data.push(
        { name: bgnToUsd, value: bgnUsd.usd.toFixed(1) }, 
        { name: usdToBgn, value: usdBgn.bgn.toFixed(1) },
        { name: bgnToEur, value: bgnEur.eur.toFixed(1) }, 
        { name: eurToBgn, value: eurBgn.bgn.toFixed(1) },
        { name: bgnToAud, value: bgnAud.aud.toFixed(1) }, 
        { name: audToBgn, value: audBgn.bgn.toFixed(1) },
        { name: bgnToCad, value: bgnCad.cad.toFixed(1) }, 
        { name: cadToBgn, value: cadBgn.bgn.toFixed(1) },
        { name: bgnToChf, value: bgnChf.chf.toFixed(1) }, 
        { name: chfToBgn, value: chfBgn.bgn.toFixed(1) },
        { name: bgnToNzd, value: bgnNzd.nzd.toFixed(1) }, 
        { name: nzdToBgn, value: nzdBgn.bgn.toFixed(1) },
        )

    data.sort((a, b) => a.value - b.value);
   
    ctx.render(bgnTemplate(data));
}