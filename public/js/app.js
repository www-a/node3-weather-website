const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const errorP = document.querySelector("#error")
const messageP = document.querySelector("#message")

weatherForm.onsubmit = (e) =>{
    e.preventDefault() //will block the default behaviour i.e. page refresh

    const location = searchTerm.value

    errorP.textContent = 'Loading....'
    messageP.textContent = ''

    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                errorP.textContent = data.error
            }else{
                errorP.textContent = ''
                //in the below line textcontent was not used as new line cannot be used with that.
                messageP.innerHTML = 'Forecast: '+data.forecast+'</br>Address: '+data.address+'</br>Location: '
                                        +data.location
            }
        })
    })
}