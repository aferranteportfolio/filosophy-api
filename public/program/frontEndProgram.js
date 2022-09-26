const mainQuote = document.getElementById('quote')
const btn = document.getElementById('test-button')

mainQuote.innerHTML = 'test'


btn.addEventListener('click', myFunc);




// function myFunc (){
//     console.log('clicking test')
// }





function myFunc() {
    console.log('test')
    window.open("http://localhost:4000/home")

}