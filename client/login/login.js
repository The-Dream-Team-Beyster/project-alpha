redirect = document.querySelector("#login-form")
redirect.addEventListener("submit", (e)=>{
    e.preventDefault()
    window.location.href = "../index.html"
})
