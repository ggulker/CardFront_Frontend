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
    try{
        let response = await fetch("http://localhost:8080/user/password/${usr}",{method:'PUT',   headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },body: JSON.stringify("")});
    }
    catch(error)
    {
        console.log(error);
    }
}