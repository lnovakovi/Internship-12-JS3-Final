const registrationForm =`<h1>Register</h1>
<form>
<input id="name" type ="text" name="username" placeholder="Username" maxlength="10" required>
<input id="password" type="password" name="password" placeholder="Password" maxlength="10" required>
<input id="password-confirm" type="password" name="password-conf" placeholder="Confirm password" maxlength="10" required>
<input type="submit" id="btnSubmit" name="signUp-button" value="Sign up"/>
</form>`;

const loginForm = `<h1>Sign in</h1>
<form>
<input id="name" type ="text" name="username" placeholder="Username" maxlength="10" required>
<input id="password" type="password" name="password" placeholder="Password" maxlength="10" required>
<input type="submit" id="btnSubmitLogin" name="signUp-button" maxlength="10" value="Sign up"/>
</form>`;

makeForm();
function makeForm(){
    let form= document.querySelector(".left-box");
    if(checkLocalStorage()){
        form.innerHTML = loginForm;
        addClikcEventLogin();
    }
    else {
        form.innerHTML = registrationForm;
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
    .then(result => {
        users = result;
        showUsers(users);
        usersArray = document.querySelectorAll(".users__item");
        postsArray = document.querySelectorAll(".userPopout")
    })
    .catch(err => console.log(err));
};

function showUsers(users){
    let mainItems = document.querySelector(".main__offers");
    users.forEach(user => {
        mainItems.innerHTML+=`<div class="users__item">
        <img class="item__img" src="./assets/images/user.png" alt="User image" />
        <button class="userPopout">Open posts</button>
        <p class="item__title">${user.name}</p>
        <p class="item__paragraph">Email: ${user.email}<br>
        City: ${user.address.city}</p>
       </div>`;
    });  
    addClickOnImages();
};

function checkInputFields(){
    let username = document.getElementById("name").value;
    let password= document.getElementById("password").value;
    let confirmedPassword = document.getElementById("password-confirm").value;    
    return username.length >= 5 && username.length <= 10 && password.length >= 5 && password.length <= 10 && password === confirmedPassword;
};

function saveToLocalStorage(){
    let username = document.getElementById("name").value;
    let password= document.getElementById("password").value;
    let userToSave = JSON.stringify({username: username, password:password});
    localStorage.setItem("user",userToSave);
};

function checkLocalStorage(){
    return localStorage.length > 0; // return false if empty
};

function checkLogIn(user){
    let username = document.getElementById("name").value;
    let password= document.getElementById("password").value;
    return user.username == username && user.password == password;
};
// get users posts
/*
function getPosts(){
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(data =>{
        return data.JSON(); // parse
    })
    then(res=>{
        //using data 
    })
    .catch(err => console.log(err)); // in case error happens
};*/

function addClickOnImages(){
    let usersImages= document.querySelectorAll(".item__img");
    usersImages.forEach((element,index) => {
        element.addEventListener("click",getInfo(index));
    });
};
//get posts
function getInfo(index){
    fetch(`https://jsonplaceholder.typicode.com/users/${index+1}`)
    .then(data => 
        {return data.json();})
    .then(result => {
        openInfo(result);
    })
};

function openInfo(result){
    let modal = document.querySelector(".modal");
    modal.innerHTML += `
    <div class="modal-content">
    <span class="close">&times;</span>
    <h3>Name: ${result.name}</h3><br>
    <p>Username: ${result.username}</p>
    <p>Email: ${result.email}</p>
    <br>
    <h3>Address:</h3>
    <p>Street: ${result.address.street}</p>
    <p>Suite: ${result.address.suite}</p>
    <p>City:${result.address.city}</p>
    <p>Zipcode: ${result.address.zipcode}</p>
    <br>
    <h3>Contact: </h3>
    <p>Phone: ${result.phone}</p>
    <p>Website: ${result.website}</p>
    <br>
    <h3> Company</h3>
    <p>Company name: ${result.company.name}</p>
    <p>Company catch phrase: ${result.company.catchPhrase}</p>
    <p>Company bs: ${result.company.bs}</p>
    </div> `;
    modal.style.display="block";
    modal.querySelector(".close").addEventListener("click",function(){
        modal.style.display="none";
        modal.innerHTML="";
    });   
};
/*
// post object to save
let postParams={
    method: "POST",
    body: JSON.stringify({
        //ono sto spremamo
        title: "neki naslov",
        body:"teskt post",
        userId: "id usera"
    })
};

//make new user post
function setPosts(){
    fetch("https://jsonplaceholder.typicode.com/posts",postParams)
    .then(data =>{
        return data.JSON();
    })
    then(res=>{

    })
    .catch(err => console.log(err));
};*/