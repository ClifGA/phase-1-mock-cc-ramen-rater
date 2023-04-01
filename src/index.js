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
        name: menuForm.name.value,
        restaurant: menuForm.restaurant.value,
        image: menuForm.image.value,
        rating: menuForm.rating.value,
        comment: menuForm['new-comment'].value
    }

    fetch(URL,{
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
