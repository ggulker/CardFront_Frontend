function setCookie(name, value, expirationHours) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expirationHours * 60 * 60 * 1000)); // Convert hours to milliseconds
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
}

function isLoginCookiePresent(){
    // Split the document.cookie string into individual cookies
    var cookies = document.cookie.split(';');

    // Iterate through the cookies and check if the specified cookie exists
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // Trim any leading or trailing spaces
        // Check if the cookie starts with the specified cookieName
        if (cookie.startsWith('JWToken=')) {
            return true; // Cookie found
        }
    }
    return false; // Cookie not found
}

async function isTokenValid(){
     // Split the document.cookie string into individual cookies
     var cookies = document.cookie.split(';');

     // Iterate through the cookies and check if the specified cookie exists
     for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i].trim(); // Trim any leading or trailing spaces
         // Check if the cookie starts with the specified cookieName
         if (cookie.startsWith('JWToken=')) {
             token = cookie.slice(8);
             let response = await fetch("http://localhost:8080/user/token/",{method:'PUT',   headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify(token)});

            if(response.OK)
                return true;
            else
                return false;
         }
     } 
     
     return false
}