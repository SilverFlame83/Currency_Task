import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const eurTemplate = (data) => html `
	<section class="welcome">
            <div class="eur-welcome">
            <p class="title"> EUR Currency rate</p>
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

export async function eurPage(ctx) {
    const eurUsd = await getCurency('/eur/usd');
    const usdEur = await getCurency('/usd/eur');
    const eurToUsd = 'EUR-USD';
    const usdToEur = 'USD-EUR';

    const eurAud = await getCurency('/eur/aud');
    const audEur = await getCurency('/aud/eur');
    const eurToAud = 'EUR-AUD';
    const audToEur = 'AUD-EUR';

    const eurCad = await getCurency('/eur/cad');
    const cadEur = await getCurency('/cad/eur');
    const eurToCad = 'EUR-CAD';
    const cadToEur = 'CAD-EUR';

    const eurChf = await getCurency('/eur/chf');
    const chfEur = await getCurency('/chf/eur');
    const eurToChf = 'EUR-CHF';
    const chfToEur = 'CHF-EUR';

    const eurNzd = await getCurency('/eur/nzd');
    const nzdEur = await getCurency('/nzd/eur');
    const eurToNzd = 'EUR-NZD';
    const nzdToEur = 'NZD-EUR';

    const eurBgn = await getCurency('/eur/bgn');
    const bgnEur = await getCurency('/bgn/eur');
    const eurToBgn = 'EUR-BGN';
    const bgnToEur = 'BGN-EUR';

    const data = [];
    data.push(
        { name: eurToUsd, value: eurUsd.usd.toFixed(1) }, 
        { name: usdToEur, value: usdEur.eur.toFixed(1) },
        { name: eurToAud, value: eurAud.aud.toFixed(1) }, 
        { name: audToEur, value: audEur.eur.toFixed(1) }, 
        { name: eurToCad, value: eurCad.cad.toFixed(1) },  
        { name: cadToEur, value: cadEur.eur.toFixed(1) }, 
        { name: eurToChf, value: eurChf.chf.toFixed(1) },
        { name: chfToEur, value: chfEur.eur.toFixed(1) },
        { name: eurToNzd, value: eurNzd.nzd.toFixed(1) },
        { name: nzdToEur, value: nzdEur.eur.toFixed(1) }, 
        { name: eurToBgn, value: eurBgn.bgn.toFixed(1) },
        { name: bgnToEur, value: bgnEur.eur.toFixed(1) }, 
        )

    data.sort((a, b) => a.value - b.value);
    ctx.render(eurTemplate(data));
}