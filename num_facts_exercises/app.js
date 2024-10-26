
baseurl = 'http://numbersapi.com'
let favNumber = '37'
// 1. 
async function oneNumberFact() {
    let res = await axios.get(`${baseurl}/${favNumber}?json`);
    console.log(res.data);
}
oneNumberFact();

// 2.
let favNumbers = [49, 73, 92];
async function manyNumberFacts() {
    try {
        let res = await axios.get(`${baseurl}/${favNumbers}?json`);

        for (let number in res.data) {
            let fact = document.createElement('li');
            fact.textContent = res.data[number];
            document.querySelector('ul').appendChild(fact);
        }
    } catch (error) {
        console.error('Error fetching number facts:', error);
    }
}
manyNumberFacts();

// 3. 
async function getFourFacts() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => axios.get(`${baseurl}/${favNumber}?json`))
    );
    facts.forEach(res => {
      $('body').append(`<p>${res.data.text}</p>`);
    });
  }
  getFourFacts();
  
