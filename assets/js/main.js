"use strict"

const topAnimeApi = 'https://api.jikan.moe/v4/top/anime';
const animeBox = document.querySelector('.anime-box');

fetch(topAnimeApi)
    .then(response => response.json())
    .then(animes => {
        console.log(animes);
        animes.data.forEach(anime => {
            createAnimeCard (anime);
        });
    })
    .catch(error => {
        console.log(error);
    });
    
function createAnimeCard (anime) {
    let star = '';
    for (let goldStar = 0  ; goldStar < 5; goldStar++) {
        star += '<i class="fa-solid fa-star"></i>'
    }
    const parentDiv = document.createElement('div');
    parentDiv.className = 'anime-card'
    parentDiv.innerHTML += `
    <h3>Rank: ${anime.rank}</h3>
    <img src='${anime.images.jpg.image_url}'>
    <h3>${anime.title}</h3>`
    animeBox.appendChild(parentDiv)
    
    const childDiv = document.createElement('div');
    childDiv.className = 'anime-hover'
    childDiv.innerHTML += `
    <p>imdb: ${anime.score} / 10 <br><span>${star}</span></p>
    <p>Studio: ${anime.studios[0].name}</p>
    <p>Release year: ${anime.year}</p>`
    parentDiv.appendChild(childDiv)
}

const toLeftBtn = document.getElementById('toLeft');
const toRightBtn = document.getElementById('toRight');

let right = 0;
toRightBtn.addEventListener('click', () => {
    if (right < 0 || right > 6420) {
        return
    }else{
        right += 321;
    }
    animeBox.style.right = `${right}px`
})


toLeftBtn.addEventListener('click', () => {
    if (right <= 0 || right > 6741) {
        return
    }else{
        right -= 321;
    }
    animeBox.style.right = `${right}px`
})