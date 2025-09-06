// add html to js
const plantCategory = document.getElementById('plantCategory')




// function
const loadContainer = () =>{
    const url = 'https://openapi.programming-hero.com/api/categories'
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        displayContainer(data.categories)
    })
}



const displayContainer=(categories)=>{
    plantCategory.innerHTML = '';
    categories.forEach(category => {
        plantCategory.innerHTML +=`
        <button class="flex items-center hover:bg-[#15803D] w-full py-2">
                <span id="${category.id}" class="flex-1 text-left px-4">${category.category_name}</span>
               </button>
        `
    });
}


loadContainer()