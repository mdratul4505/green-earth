// add html to js
const allPlantCategory = document.getElementById('plantCategory');
const plantsCategory = document.getElementById('plantsCategory');
const yourCard = document.getElementById('yourCard');

let addCards = [];


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
    allPlantCategory.innerHTML = '';
    categories.forEach(category => {
        allPlantCategory.innerHTML +=`
        <li id="${category.id}"  class="w-full hover:bg-[#15803D] text-left px-4 py-2 m-1">${category.category_name}</li>
        `
    });
}

allPlantCategory.addEventListener('click', e =>{
    const allLi = document.querySelectorAll('li')
    allLi.forEach(li => {
        li.classList.remove('bg-[#15803D]')
        
    });
    if(e.target.nodeName == 'LI'){
        
        e.target.classList.add('bg-[#15803D]')
        const id = (e.target.id)
        plantsByCategory(id);
    }
})




// plants by category
const plantsByCategory = (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => 
        
            showPlantByCategory(data.plants)

            
        
    )
} 



const showPlantByCategory = (trees) => {
    plantsCategory.innerHTML = '';
    trees.forEach(tree => {
        
        plantsCategory.innerHTML += `
        
    <div class="bg-white flex flex-col h-full p-4 rounded-lg shadow">
  <div>
    <img src="${tree.image}" alt="" class="w-full h-40 object-cover rounded-md">
  </div>

  <div class="flex flex-col flex-grow">
    <h2 class="font-semibold mt-2">${tree.name}</h2>
    <p class="text-[12px] py-2 flex-grow">${tree.description.slice(0, 70)}...</p>

    <div class="flex justify-between items-center mt-2">
      <button class="btn rounded-[999px] bg-[#DCFCE7] text-[#15803D]">${tree.category}</button>
      <h1>${tree.price ? tree.price + " tk" : "N/A"}</h1>
    </div>

    
    <button class="w-full btn bg-[#15803D] text-white rounded-[999px] font-medium mt-2">Add to Cart</button>
  </div>
</div>   
        
        `
    });
        
    
} 

const loadPlants = ()=>{
    const url = 'https://openapi.programming-hero.com/api/plants'
    fetch(url)
    .then(res => res.json())
    .then(data => showPlantByCategory(data.plants))
}

plantsCategory.addEventListener('click',(e)=>{
    // console.log(e.target.innerText)
    if(e.target.innerText === 'Add to Cart'){
        
        handelAddCard(e)
    }
})

const handelAddCard =(e) =>{
    const name =e.target.parentNode.children[0].innerText
        const price = e.target.parentNode.querySelector('h1').innerText
        addCards.push({
            name : name,
            price : price
        })
        showAddCard(addCards)
}

const showAddCard = (cards) =>{
    yourCard.innerHTML = '';
    cards.forEach(card => {
        yourCard.innerHTML +=`
        <div class="flex justify-between items-center bg-[#F0FDF4] p-2 pl-3 m-3">
        <div class="">
          <h2>${card.name}</h2>
        <p>${card.price}</p>
        </div>
        <div>
          <span><i class="fa-solid fa-xmark"></i></span>
        </div>
      </div>
        `
    });
}

// plantsByCategory('01')
loadPlants()
loadContainer()



