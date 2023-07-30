"use strict"

const topAnimeApi = 'https://api.jikan.moe/v4/top/anime';
const animeBox = document.querySelector('.anime-box');
const mainAnime = document.querySelector('#animes');
const searchBtn = document.getElementById('button');
const searchInput = document.getElementById('search-input');
const searchResult = document.getElementById('search-result');
const searchBox = document.querySelector('.search-box');
const closeResult = document.getElementById('close-result');
const error = document.getElementById('error');
const toLeftBtn = document.getElementById('toLeft');
const toRightBtn = document.getElementById('toRight');
let right = 0;

searchBtn.addEventListener('click', () => {
    searchResult.innerHTML = '';
    const searchInputValue = searchInput.value.toLowerCase();
    error.style.top = '8px';

    fetch('https://api.jikan.moe/v4/anime')
        .then(response => response.json())
        .then(animes => {
            searchAnime(animes, searchInputValue);

            fetch(topAnimeApi)
                .then(response => response.json())
                .then(animes => {
                    searchAnime(animes, searchInputValue);

                    if (searchInputValue == '' || searchInputValue.length < 3){
                        error.style.top = '40px';
                        searchBox.style.height = '0px';
                        return
                    }

                    if(searchResult.innerHTML == ''){
                        searchBox.style.height = '150px';
                        searchResult.innerHTML = '<h2>no result</h2>';
                    }else{
                        searchBox.style.height = '600px';
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            })
        .catch(error => {
            console.log(error);
        });
});

fetch('https://api.jikan.moe/v4/anime')
    .then(response => response.json())
    .then(animes => {
        animes.data.forEach(anime => createAnimeCard2(anime, mainAnime));
    })
    .catch(error => {
        console.log(error);
    });

fetch(topAnimeApi)
    .then(response => response.json())
    .then(animes => {
        animes.data.forEach(anime => createAnimeCard (anime));
    })
    .catch(error => {
        console.log(error);
    });

function createAnimeCard2(anime, mainAnime){
    let star = '';
    
    for (let goldStar = 0  ; goldStar < anime.score / 2; goldStar++) {
        star += '<i class="fa-solid fa-star"></i>'
    }
    for (let goldStar = 0  ; goldStar < Math.floor(5 - (anime.score / 2)) ; goldStar++) {
        star += '<i class="fa-regular fa-star"></i>'
    }
    
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML += `
    <h3>Rank: ${anime.rank}</h3>
    <img src='${anime.images.jpg.image_url}'>
    <h3>${anime.title}</h3>
    <p>imdb: ${anime.score} / 10 <br><span>${star}</span></p>
    <p>Studio: ${anime.studios[0].name}</p>
    <p>Release year: ${anime.year}</p>`
    mainAnime.appendChild(parentDiv);
}

function searchAnime(params, searchInputValue) {
    params.data.forEach(anime => {
        if (anime.title.toLowerCase().indexOf(searchInputValue) != -1) {
            createAnimeCard2 (anime, searchResult);
        }
    });

    closeResult.addEventListener('click', () => searchBox.style.height = '0px')
}

function createAnimeCard(anime) {
    let star = '';

    for (let goldStar = 0  ; goldStar < 5; goldStar++) {
        star += '<i class="fa-solid fa-star"></i>';
    }

    const parentDiv = document.createElement('div');
    parentDiv.className = 'anime-card';
    parentDiv.innerHTML += `
    <h3>Rank: ${anime.rank}</h3>
    <img src='${anime.images.jpg.image_url}'>
    <h3>${anime.title}</h3>`
    animeBox.appendChild(parentDiv);
    
    const childDiv = document.createElement('div');
    childDiv.className = 'anime-hover';
    childDiv.innerHTML += `
    <p>imdb: ${anime.score} / 10 <br><span>${star}</span></p>
    <p>Studio: ${anime.studios[0].name}</p>
    <p>Release year: ${anime.year}</p>`
    parentDiv.appendChild(childDiv);
}

toRightBtn.addEventListener('click', () => {
    if (right < 0 || right > 6420) {
        return
    }else{
        right += 321;
    }
    animeBox.style.right = `${right}px`;
})

toLeftBtn.addEventListener('click', () => {
    if (right <= 0 || right > 6741) {
        return
    }else{
        right -= 321;
    }
    animeBox.style.right = `${right}px`;
})

