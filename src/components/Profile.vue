<template>
<div>
    <app-navbar></app-navbar>
    <div id="profile" class="section-wrapper">
        <h3>Profilo di {{username}}</h3>
        <h6>{{email}}</h6>
        <!---span class="label">Bio</span><span>{{bio}}</span---->
        <div class="articles-section mt-3" v-if="posts.length > 0" >
            <h5><strong>Articoli creati da questo profilo</strong></h5>
            <table class="table">
                <thead class="table-success">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titolo</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="article in posts" :key="article.id">
                    <th scope="row"><a :href="'/post/' + article.id">{{article.id}}</a></th>
                    <td>{{article.title}}</td>
                    <td>{{article.body}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-3" v-else>
        <h5><strong>Questo profilo non ha scritto nessun articolo, creane uno nella home page!</strong></h5>
        </div>
    </div>
    </div>
</template>


<script>
export default{
    data(){
        return {
            
    lastUrlString: window.location.href.split("/"),
            baseUrl: "http://localhost:8080",
            current_user_id: localStorage.getItem("userid"),
            posts: [],
            username: '',
            email: ''

        }
    },
    methods:{
        getPostsOfUser: function(){
            axios.get(this.baseUrl + "/api/posts/ofCustomer/" + this.lastUrlString[this.lastUrlString.length - 1])
                .then((response) => {
                    this.posts = response.data;
                }).catch((error) => {
                console.log(error);
            });
        },
        getProfile: function() {
            axios.get(this.baseUrl + "/api/customers/" + this.lastUrlString[this.lastUrlString.length - 1]).then((response) => {
                console.log(response);
                this.username = response.data.name;
                this.email = response.data.email;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    mounted: function(){
        this.getProfile();
        this.getPostsOfUser();
    }
}
</script>

<style scoped>

    #profile {
        width: 80%;
        margin: 20px auto;
    }
</style>
