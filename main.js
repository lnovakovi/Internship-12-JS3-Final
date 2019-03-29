const registrationForm =`<h1>Register</h1>
<form>
<input id="name" type ="text" name="username" placeholder="Username" required>
<input id="password" type="password" name="password" placeholder="Password" required>
<input id="password-confirm" type="password" name="password-conf" placeholder="Confirm password" required>
<input type="submit" id="btnSubmit" name="signUp-button" value="Sign up"/>
</form>`;

const loginForm = `<h1>Sign in</h1>
<form>
<input id="name" type ="text" name="username" placeholder="Username" required>
<input id="password" type="password" name="password" placeholder="Password" required>
<input type="submit" id="btnSubmitLogin" name="signUp-button" value="Sign up"/>
</form>`;

makeForm();
function makeForm(){
    let div= document.querySelector(".left-box");
    if(checkLocalStorage()){
        div.innerHTML = loginForm;
        addClikcEventLogin();
    }
    else {
        div.innerHTML = registrationForm;
        addClickEventRegister();
    }
};

function addClickEventRegister(){
    document.getElementById("btnSubmit").addEventListener("click",function(event){
        event.preventDefault();
        if(checkInputFields()){
            saveToLocalStorage();
            openMainPage();
        } 
        else{
            alert("Please check your input");
        }
    });
};
function addClikcEventLogin(){
    document.getElementById("btnSubmitLogin").addEventListener("click",function(event){
        event.preventDefault();
        let existingUser = localStorage.getItem("user");
        existingUser = JSON.parse(existingUser);
        if(checkLogIn(existingUser)){
            openMainPage();
        }
        else{
            alert("Username or password not correct");
        } 
    });
}

function openMainPage(){
    let registrationBox = document.querySelector("#registration-box");
    registrationBox.style.display="none";
    getUsers();
    
};
function getUsers(){
     fetch("https://jsonplaceholder.typicode.com/users")
    .then(data => {
        return data.json();
    })
    .then(res => {
        users = res;
        showUsers(users);
        usersArray = document.querySelectorAll(".users__item");
        postsArray = document.querySelectorAll(".userPopout")
    })
    .catch(err => console.log(err));
}

function showUsers(users){
    let mainItems = document.querySelector(".main__offers");
    users.forEach(user => {
        mainItems.innerHTML+=`<div class="users__item">
        <img class="item__img" src="./assets/images/offer.jpg" alt="User image" />
        <button class="userPopout">Open posts</button>
        <p class="item__title">${user.name}</p>
        <p class="item__paragraph">Email: ${user.email}</p>
        <p class="item__paragraph">City: ${user.address.city}</p>
       </div>`
    });  
}
function checkInputFields(){
    let username = document.getElementById("name").value;
    let password= document.getElementById("password").value;
    let confirmedPassword = document.getElementById("password-confirm").value;    
    return username.length >= 5 && username.length <= 10 && password.length >= 5 && password.length <= 10 && password === confirmedPassword;
}

function saveToLocalStorage(){
    let username = document.getElementById("name").value;
    let password= document.getElementById("password").value;
    let userToSave = JSON.stringify({username: username, password:password});
    localStorage.setItem("user",userToSave);
}

function checkLocalStorage(){
    return localStorage.length > 0; // return false if empty
}

function checkLogIn(user){
    let username = document.getElementById("name").value;
    let password= document.getElementById("password").value;
    return user.username == username && user.password == password;
}