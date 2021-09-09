import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const cadTemplate = (data) => html `
	<section class="welcome">
            <div class="cad-welcome">
            <p class="cad-title"> CAD Currency rate</p>
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

export async function cadPage(ctx) {
    const cadUsd = await getCurency('/cad/usd');
    const usdCad = await getCurency('/usd/cad');
    const cadToUsd = 'CAD-USD';
    const usdToCad = 'USD-CAD';

    const cadEur = await getCurency('/cad/eur');
    const eurCad = await getCurency('/eur/cad');
    const cadToEur = 'CAD-EUR';
    const eurToCad = 'EUR-CAD';

    const cadAud = await getCurency('/cad/aud');
    const audCad = await getCurency('/aud/cad');
    const cadToAud = 'CAD-AUD';
    const audToCad = 'AUD-CAD';

    const cadChf = await getCurency('/cad/chf');
    const chfCad = await getCurency('/chf/cad');
    const cadToChf = 'CAD-CHF';
    const chfToCad = 'CHF-CAD';

    const cadNzd = await getCurency('/cad/nzd');
    const nzdCad = await getCurency('/nzd/cad');
    const cadToNzd = 'CAD-NZD';
    const nzdToCad = 'NZD-CAD';

    const cadBgn = await getCurency('/cad/bgn');
    const bgnCad = await getCurency('/bgn/cad');
    const cadToBgn = 'CAD-BGN';
    const bgnToCad = 'BGN-CAD';


    const data = [];
    data.push(
        { name: cadToUsd, value: cadUsd.usd.toFixed(1) }, 
        { name: usdToCad, value: usdCad.cad.toFixed(1) },
        { name: cadToEur, value: cadEur.eur.toFixed(1) }, 
        { name: eurToCad, value: eurCad.cad.toFixed(1) },
        { name: cadToAud, value: cadAud.aud.toFixed(1) }, 
        { name: audToCad, value: audCad.cad.toFixed(1) },
        { name: cadToChf, value: cadChf.chf.toFixed(1) }, 
        { name: chfToCad, value: chfCad.cad.toFixed(1) },
        { name: cadToNzd, value: cadNzd.nzd.toFixed(1) }, 
        { name: nzdToCad, value: nzdCad.cad.toFixed(1) },
        { name: cadToBgn, value: cadBgn.bgn.toFixed(1) }, 
        { name: bgnToCad, value: bgnCad.cad.toFixed(1) },
        )

    data.sort((a, b) => a.value - b.value);
   
    ctx.render(cadTemplate(data));
}