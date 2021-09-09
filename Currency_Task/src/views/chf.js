import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const chfTemplate = (data) => html `
	<section class="welcome">
            <div class="chf-welcome">
            <p class="title"> CHF Currency rate</p>
            <article class="cad-card">
            <div class="group-name"> Group1 ${data.map((d)=> html`${calcOne(d)}`)}</div>
            <div class="count">Count: ${getCountOne(data)}</div>
            </article>
            <article class="cad-card">
            <div class="group-name"> Group2 ${data.map((d)=> html`${calcTwo(d)}`)}</div>
            <div class="count">Count: ${getCountTwo(data)}</div>
            </article>
            <article class="cad-card">
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

export async function chfPage(ctx) {
    const chfUsd = await getCurency('/chf/usd');
    const usdChf = await getCurency('/usd/chf');
    const chfToUsd = 'CHF-USD';
    const usdToChf = 'USD-CHF';

    const chfEur = await getCurency('/chf/eur');
    const eurChf = await getCurency('/eur/chf');
    const chfToEur = 'CHF-EUR';
    const eurToChf = 'EUR-CHF';

    const chfAud = await getCurency('/chf/aud');
    const audChf = await getCurency('/aud/chf');
    const chfToAud = 'CHF-AUD';
    const audToChf = 'AUD-CHF';

    const chfCad = await getCurency('/chf/cad');
    const cadChf = await getCurency('/cad/chf');
    const chfToCad = 'CHF-CAD';
    const cadToChf = 'CAD-CHF';

    const chfNzd = await getCurency('/chf/nzd');
    const nzdChf = await getCurency('/nzd/chf');
    const chfToNzd = 'CHF-NZD';
    const nzdToChf = 'NZD-CHF';

    const chfBgn = await getCurency('/chf/bgn');
    const bgnChf = await getCurency('/bgn/chf');
    const chfToBgn = 'CHF-BGN';
    const bgnToChf = 'BGN-CHF';

    const data = [];
    data.push(
        { name: chfToUsd, value: chfUsd.usd.toFixed(1) }, 
        { name: usdToChf, value: usdChf.chf.toFixed(1) },
        { name: chfToEur, value: chfEur.eur.toFixed(1) }, 
        { name: eurToChf, value: eurChf.chf.toFixed(1) },
        { name: chfToAud, value: chfAud.aud.toFixed(1) }, 
        { name: audToChf, value: audChf.chf.toFixed(1) },
        { name: chfToCad, value: chfCad.cad.toFixed(1) }, 
        { name: cadToChf, value: cadChf.chf.toFixed(1) },
        { name: chfToNzd, value: chfNzd.nzd.toFixed(1) }, 
        { name: nzdToChf, value: nzdChf.chf.toFixed(1) },
        { name: chfToBgn, value: chfBgn.bgn.toFixed(1) }, 
        { name: bgnToChf, value: bgnChf.chf.toFixed(1) },
        )

    data.sort((a, b) => a.value - b.value);
   
    ctx.render(chfTemplate(data));
}