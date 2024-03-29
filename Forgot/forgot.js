window.addEventListener("DOMContentLoaded", (event) => {  
    //button click to login
    const el = document.getElementById("ConfirmButton");
    el.addEventListener("click", forgotPassword);
});

async function forgotPassword() {
    let usr = document.getElementById("username").value;
    let invalidText = document.getElementById("badLogin");

    if((usr.trim() == ""))
    {
        invalidText.textContent = "Please fill in all fields";
        invalidText.style.display = "block" ;
        return;
    }


    invalidText.style.display = "none" ;
    const url = `http://localhost:8080/user/password/${usr}`
    try{
        let response = await fetch(url,{method:'PUT',   headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },body: JSON.stringify("")});
        if(response.ok || response.status == 404){
            invalidText.textContent = "If an email exists for that username an email has been sent.";
            invalidText.style.display = "block" ;
        }
        else
        {
            invalidText.textContent = "An error has occured please try again later.";
            invalidText.style.display = "block" ;            
        }
    }
    catch(error)
    {
        console.log(error);
    }
}