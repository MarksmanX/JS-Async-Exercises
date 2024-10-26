
const baseurl = 'https://deckofcardsapi.com/api/deck/'

// 1. 
async function singleCard() {
    let res = await axios.get(`${baseurl}/new/draw/?count=1`);
    console.log(res.data.cards[0].value, res.data.cards[0].suit);
}
singleCard();

// 2.
async function twoCards() {
    let res1 = await axios.get(`${baseurl}/new/draw/?count=1`);
    let deckId = res1.data.deck_id;
    let res2 = await axios.get(`${baseurl}/${deckId}/draw/?count=1`)
    console.log(res1.data.cards[0].value, res1.data.cards[0].suit);
    console.log(res2.data.cards[0].value, res2.data.cards[0].suit);
}
twoCards()

// 3. 
let deckId = null
let $btn = document.querySelector('button');
let $cardArea = document.querySelector('#card-area')

async function getShuffledDeck() {
    try {
        let res = await axios.get(`${baseurl}/new/shuffle/`);
    deckId = res.data.deck_id;
    $btn.style.display = 'block';
    }
    catch (err) {
        console.error('Error fetching new shuffled deck:', err);
    }
}
getShuffledDeck();

$btn.addEventListener('click', async function() {
    let res = await axios.get(`${baseurl}/${deckId}/draw/`)
    let cardSrc = res.data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    let img = document.createElement('img');

    img.src = cardSrc;
    img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
    document.getElementById('cardArea').appendChild(img);
    if (res.data.remaining === 0) $btn.style.display = 'none';
});
