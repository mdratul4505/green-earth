// add html to js
const allPlantCategory = document.getElementById('plantCategory');
const plantsCategory = document.getElementById('plantsCategory');
const yourCard = document.getElementById('yourCard');
const price = document.getElementById('TotalPrice')
const modal = document.getElementById('details-container')

let addCards = [];
let totalPrice = 0;


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
        showLoading()
        e.target.classList.add('bg-[#15803D]')
        const id = (e.target.id)
        plantsByCategory(id);
        
    }
})


// {id: 1, image: 'https://i.ibb.co.com/cSQdg7tf/mango-min.jpg', name: 'Mango Tree', description: 'A fast-growing tropical tree that produces delicio…s sweet fruits are rich in vitamins and minerals.', category: 'Fruit Tree', …}
// category
// : 
// "Fruit Tree"
// description
// : 
// "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
// id
// : 
// 1
// image
// : 
// "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
// name
// : 
// "Mango Tree"
// price
// : 
// 500

// plants by category
const plantsByCategory = (id) =>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => 
        
            showPlantByCategory(data.plants)

            
        
    )
} 

const loadTreeDetail = (id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showTreeDetail(data.plants , data.category))
}

const showTreeDetail = (tree , category)=>{
    console.log(category)
    console.log(tree)
    modal.innerHTML = `
    <div class="space-y-5">
        <h2 class="font-semibold text-2xl">${tree.name}</h2>
        <img class="w-full h-60 object-cover rounded-md" src="${tree.image}" alt="">
        <h4><span class="font-medium text-xl">Category: </span> ${tree.category}</h4>
        <h4><span class="font-semibold">Price:</span> ${tree.price}</h4>
        <p><span class="font-semibold">Description:</span>  ${tree.description}</p>
        
      </div>
    
    `
    document.getElementById('my_modal_1').showModal();
}


// show plant category
const showPlantByCategory = (trees) => {
    plantsCategory.innerHTML = '';
    trees.forEach(tree => {
       
        plantsCategory.innerHTML += `
        
    <div class="bg-white flex flex-col lg:h-120 p-4 rounded-lg shadow">
  <div>
    <img src="${tree.image}" alt="" class="w-full h-40 object-cover rounded-md">
  </div>

  <div class="flex flex-col flex-grow">
       <div onclick="loadTreeDetail(${tree.id})"><h2 class="font-semibold mt-2">${tree.name}</h2> </div>
    <p class="text-[12px] py-2 flex-grow">${tree.description.slice(0, 70)}...</p>

    <div class="flex justify-between items-center mt-2">
      <button class="btn rounded-[999px] bg-[#DCFCE7] text-[#15803D]">${tree.category}</button>
      <h1>${ tree.price + " tk" }</h1>
    </div>

    
    <button class="w-full btn bg-[#15803D] text-white rounded-[999px] font-medium mt-2">Add to Cart</button>
  </div>
</div>   
        
        `
    });
        
    
} 

// plant card load 
const loadPlants = ()=>{
    const url = 'https://openapi.programming-hero.com/api/plants'
    fetch(url)
    .then(res => res.json())
    .then(data => showPlantByCategory(data.plants))
}

plantsCategory.addEventListener('click',(e)=>{
    if(e.target.innerText === 'Add to Cart'){
        alert('Trees has been added to the card !')
        handelAddCard(e)
    }
    if(e.target.innerText === ''){

    }
})

const handelAddCard =(e) =>{
    const name =e.target.parentNode.children[0].innerText
        const price = e.target.parentNode.querySelector('h1').innerText
        const priceInt = parseInt(price)
        addCards.push({
            name : name,
            price : price
        })
        totalPrice += priceInt;
        updateTotal();
        showAddCard(addCards)
        
}

const showAddCard = (cards) =>{
    yourCard.innerHTML = '';
    cards.forEach((card , index) => {
        yourCard.innerHTML +=`
        <div class="flex justify-between items-center bg-[#F0FDF4] p-2 pl-3 m-3">
        <div class="">
          <h2>${card.name}</h2>
        <p>${card.price}</p>
        </div>
        <div>
          <button onclick="deleteCard(${index})" class="cursor-pointer text-red-600 hover:bg-red-300"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
        `
    });
    
}

const deleteCard = (index) =>{
    const removedPrice = parseInt(addCards[index].price);
    addCards.splice(index, 1);
    totalPrice -= removedPrice;
    updateTotal()
    showAddCard(addCards)
}

const updateTotal =() =>{
    price.innerText = totalPrice;
}

const showLoading= () =>{
    plantsCategory.innerHTML = `
    <div class="text-xl font-semibold">loading <span class="loading loading-dots loading-sm"></span></div>
    `
}

loadPlants()
loadContainer()



