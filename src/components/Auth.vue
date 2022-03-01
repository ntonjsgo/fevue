<template>
    <div id="auth" class="glass_login container">
        <div class="row">
            <div class="col-12">
                <h1 class="h3 mb-3 fw-normal d-flex justify-content-center text-white">Reddit 2.0</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex-justify-content-center">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="name-input" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"  required>
                </div>
            </div>
            <div v-if="!isLogin" class="col-12 d-flex-justify-content-center">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="email-input" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"  required>
                </div>
            </div>
            <div class="col-12 d-flex-justify-content-center">
                <div class="input-group mb-3">
                    <input type="password" class="form-control"  placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" required>
                </div>
            </div>
            <div class="offset-3 col-6 d-flex-justify-content-center">
                <button v-if="isLogin" class="w-100 btn btn-lg bg-gradient text-white" type="submit" id="login" @click="fetchUser">Login</button>
                <button v-else class="w-100 btn btn-lg bg-gradient text-white" type="submit" id="signup" @click="createUser">Signup</button>
            </div>
            <a class="login-toggler mt-3" v-if="isLogin" @click="isLogin = !isLogin">Non hai un account? Registrati!</a>
            <a v-else class="login-toggler mt-3" @click="isLogin = !isLogin">Hai già un account? Fai un login!</a>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src


export default {
    name: 'Auth',
    data(){
        return{
            url : "http://localhost:8080",
            isLogin: true
        }
    },
    methods: {
        fetchUser: function (){
            let name = document.getElementById('name-input').value;
            axios.get(`${this.url}/api/customers/name/${name}`)
                .then((response)=>{
                    if (response.data.length === 0) {
                        alert("L'utente non esiste :'( ");
                    }
                    else{
                        let loggedUser = response.data[0];
                     localStorage.setItem('username', loggedUser.name);
                     localStorage.setItem('userid', loggedUser.id);
                     localStorage.setItem('useremail', loggedUser.email);
                     window.location.href = '/home';
                    }
                })



        }, 
        createUser: function() {
            let name = document.getElementById('name-input').value;
            let email = document.getElementById('email-input').value;
            let payload = {
                "name": name,
                "email": email
            };
            axios.post(this.url + "/api/customers/create", payload).then((res)=> {
                localStorage.setItem('username', res.data.name);
                     localStorage.setItem('userid', res.data.id);
                     localStorage.setItem('useremail', res.data.email);
                     window.location.href = '/home';
            })
        }
    },
    mounted: function() {}
}
</script>

<style scoped>
body{
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;

}

a {
    color: black;
    text-decoration: none;
}

a:hover {
    color:#b82c2c; 
    text-decoration:none; 
    cursor:pointer;  
}

.login-toggler {
    text-align: center;
}
</style>