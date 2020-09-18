console.log('Client side')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    //Doesn't let the page refresh after clicking on the search button
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...' 
    messageTwo.textContent = ''
    
    fetch(`/weather?address=${location}`).then((response) => {    
    response.json().then((data) => {
        if(data.error){
            console.log()
            messageOne.textContent = `Error: ${data.error}` 
        } else {
            messageOne.textContent = `Location: ${data.location}` 
            messageTwo.textContent = `Forecast: ${data.forecast}`            
        }        
    })
})
    console.log(location)
})
