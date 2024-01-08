window.addEventListener("DOMContentLoaded", (event) => {  
    //button click to login
    const el = document.getElementById("createButton");
    el.addEventListener("click", createAccount);
});

async function createAccount() {
    let usr = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let invalidText = document.getElementById("badLogin");

    if((usr.trim() == "") || (pass.trim() == "") || (email.trim() == ""))
    {
        invalidText.textContent = "Please fill in all fields";
        invalidText.style.display = "block" ;
        return;
    }

    if(pass.length < 8 || pass.length > 64 || !/[!@#$%^]/.test(pass))
    {
        invalidText.textContent = "Valid Passwords Contain between 8-64 characters and contain 1 of the following characters !,@,#,$,%,^";
        invalidText.style.display = "block" ;
        return;
    }

    invalidText.style.display = "none" ;
    try{
        let hash = CryptoJS.SHA256(pass);
        let response = await fetch("http://localhost:8080/user",{method:'PUT',   headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },body: JSON.stringify({username: usr, password: hash.toString(), email: email})});

        if(response.status == 208)
        {
            invalidText.textContent = "Username already in use";
            invalidText.style.display = "block" ;
            return;
        }
        
        window.location.href = "../DashBoard/dashboard.html";    
    }
    catch(error)
    {
        console.log(error);
    }
}