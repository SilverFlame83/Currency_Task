import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCurency } from '../api/data.js';

const homeTemplate = (data) => html `
    	<section class="welcome">
            <div class="welcome-container">
            <p class="title"> USD Currency rate</p>
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
        return html `<p class="groupOne">${data.name} : ${data.value}</p>`;
    }
}

function calcTwo(data) {
    if (data.value >= 1 && data.value <= 1.5) {
        return html `<p id="groupTwo">${data.name} : ${data.value}</p>`;
    }
}
function calcThree(data) {
    if (data.value >= 1.5) {
        return html `<p id="groupThree">${data.name} : ${data.value}</p>`;
    }
}


export async function homePage(ctx) {
    const usdEur = await getCurency('/usd/eur');
    const eurUsd = await getCurency('/eur/usd');
    const usdToEur = 'USD-EUR';
    const eurToUsd = 'EUR-USD';
    
    const usdAud = await getCurency('/usd/aud');
    const audUsd = await getCurency('/aud/usd');
    const usdToAud = 'USD-AUD';
    const audToUsd = 'AUD-USD';
    
    const usdCad = await getCurency('/usd/cad');
    const cadUsd = await getCurency('/cad/usd');
    const usdToCad = 'USD-CAD';
    const cadToUsd = 'CAD-USD';
    
    const usdChf = await getCurency('/usd/chf');
    const chfUsd = await getCurency('/chf/usd');
    const usdToChf = 'USD-CHF';
    const chfToUsd = 'CHF-USD';
    
    const usdNzd = await getCurency('/usd/nzd');
    const nzdUsd = await getCurency('/nzd/usd');
    const usdToNzd = 'USD-NZD';
    const nzdToUsd = 'NZD-USD';
    
    const usdBgn = await getCurency('/usd/bgn');
    const bgnUsd = await getCurency('/bgn/usd');
    const usdToBgn = 'USD-BGN';
    const bgnToUsd = 'BGN-USD';
    
    
    const data = [];
    data.push(
        { name: usdToEur, value: usdEur.eur.toFixed(1) }, 
        { name: eurToUsd, value: eurUsd.usd.toFixed(1) }, 
        { name: usdToAud, value: usdAud.aud.toFixed(1) }, 
        { name: audToUsd, value: audUsd.usd.toFixed(1) }, 
        { name: usdToCad, value: usdCad.cad.toFixed(1) }, 
        { name: cadToUsd, value: cadUsd.usd.toFixed(1) }, 
        { name: usdToChf, value: usdChf.chf.toFixed(1) }, 
        { name: chfToUsd, value: chfUsd.usd.toFixed(1) }, 
        { name: usdToNzd, value: usdNzd.nzd.toFixed(1) }, 
        { name: nzdToUsd, value: nzdUsd.usd.toFixed(1) },
        { name: usdToBgn, value: usdBgn.bgn.toFixed(1) }, 
        { name: bgnToUsd, value: bgnUsd.usd.toFixed(1) },
        )
        
        data.sort((a, b) => a.value - b.value);
        
        ctx.render(homeTemplate(data));
    }