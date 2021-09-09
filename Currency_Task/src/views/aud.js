import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const audTemplate = (data) => html `
	<section class="welcome">
            <div class="aud-welcome">
            <p class="title"> AUD Currency rate</p>
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

export async function audPage(ctx) {
    const audUsd = await getCurency('/aud/usd');
    const usdAud = await getCurency('/usd/aud');
    const audToUsd = 'AUD-USD';
    const usdToAud = 'USD-AUD';

    const audEur = await getCurency('/aud/eur');
    const eurAud = await getCurency('/eur/aud');
    const audToEur = 'AUD-EUR';
    const eurToAud = 'EUR-AUD';

    const audCad = await getCurency('/aud/cad');
    const cadAud = await getCurency('/cad/aud');
    const audToCad = 'AUD-CAD';
    const cadToAud = 'CAD-AUD';

    const audChf = await getCurency('/aud/chf');
    const chfAud = await getCurency('/chf/aud');
    const audToChf = 'AUD-CHF';
    const chfToAud = 'CHF-AUD';

    const audNzd = await getCurency('/aud/nzd');
    const nzdAud = await getCurency('/nzd/aud');
    const audToNzd = 'AUD-NZD';
    const nzdToAud = 'NZD-AUD';

    const audBgn = await getCurency('/aud/bgn');
    const bgnAud = await getCurency('/bgn/aud');
    const audToBgn = 'AUD-BGN';
    const bgnToAud = 'BGN-AUD';

    const data = [];
    data.push(
        { name: audToUsd, value: audUsd.usd.toFixed(1) }, 
        { name: usdToAud, value: usdAud.aud.toFixed(1) },
        { name: audToEur, value: audEur.eur.toFixed(1) }, 
        { name: eurToAud, value: eurAud.aud.toFixed(1) },
        { name: audToCad, value: audCad.cad.toFixed(1) }, 
        { name: cadToAud, value: cadAud.aud.toFixed(1) },
        { name: audToChf, value: audChf.chf.toFixed(1) }, 
        { name: chfToAud, value: chfAud.aud.toFixed(1) },
        { name: audToNzd, value: audNzd.nzd.toFixed(1) }, 
        { name: nzdToAud, value: nzdAud.aud.toFixed(1) },
        { name: audToBgn, value: audBgn.bgn.toFixed(1) }, 
        { name: bgnToAud, value: bgnAud.aud.toFixed(1) },
        )

    data.sort((a, b) => a.value - b.value);
   
    ctx.render(audTemplate(data));
}