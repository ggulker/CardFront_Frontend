window.addEventListener("DOMContentLoaded", (event) => {
    if(isLoginCookiePresent())
    {
        window.location.href = "../DashBoard/dashboard.html";
    }
    //button click to login
    el.addEventListener("click", startLogin);

    //add enter login
    document.addEventListener("keypress", function(e){ if(e.key == "Enter"){startLogin()} });
});

async function startLogin() {
    //grab username/pass
    let usr = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let invalidText = document.getElementById("badLogin");
    
    //validate fields are not empty
    if((usr.trim() == "") || (pass.trim() == ""))
    {
        invalidText.textContent = "Please fill in both fields before attempting login";
        invalidText.style.display = "block" ;
        return;
    }
    else
    {
        invalidText.style.display = "none" ;
    }

    try{
        let hash = CryptoJS.SHA256(pass);
        console.log("Sent");
        const response = await fetch
        (
            "http://localhost:8080/user",
            {
                method:'POST',   
                headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: 
                    JSON.stringify
                    (
                        {
                            username: usr, 
                            password: hash.toString()
                        }
                    )
            }
        );

        const jwToken = await response.text();
        console.log(jwToken);
        if(response.ok)
        {
            setCookie('JWToken', jwToken, 24);
            window.location.href = "../DashBoard/dashboard.html";
        }
        else
        {
            invalidText.textContent = "Invalid Username or Password";
            invalidText.style.display = "block" ;
        }
    }
    catch(error)
    {
        console.log(error);
    }

    return;
}