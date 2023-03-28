// write your code here
const URL ='http://localhost:3000/ramens'
fetch(URL).then(res => res.json()).then(data => renderMenu(data))

const menuImgDiv = document.querySelector('#ramen-menu')
const detailIMG = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const ramenDesript = document.querySelector('.restaurant')
const userRating = document.querySelector('#rating-display')
const userComment = document.querySelector('#comment-display')

const menuForm = document.querySelector('#new-ramen')
const formName = document.getElementById('new-name')
const formResturant = document.getElementById('new-restaurant')
const formImage = document.getElementById('new-image')
const formRating = document.getElementById('new-rating')
const formComment = document.getElementById('new-comment')

console.log(formName)
const renderMenu = array => {
    array.forEach(element => {
       const menuIMG = document.createElement('img')
        menuIMG.src = element.image
        menuImgDiv.append(menuIMG)

        menuIMG.addEventListener('click', (e) =>{
            detailIMG.src = menuIMG.src 
            ramenName.textContent = element.name
            ramenDesript.textContent = element.restaurant
            userRating.textContent = element.rating  
            userComment.textContent = element.comment  
        })
    });
}

menuForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    let parse = {
        name: formName.value,
        restaurant: formResturant.value,
        image: formImage.value,
        rating: formRating.value,
        comment: formComment.value
    }

    fetch(URL, {
                 method: "POST",
                 headers: {
                   "Content-type": "Application/json",
                 },
                 body: JSON.stringify(parse),
               })
                 .then((res) => res.json())
                 .then((data) => renderMenu([data]));

        menuForm.reset()
  
})
