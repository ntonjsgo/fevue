<template>
    <div>
        <app-navbar></app-navbar>
        <div class="container">
            <div class="page-header" id="banner">
                <div class="row">
                    <div class="col-lg-8 col-md-7 col-sm-6">
                        <p class="lead">
                            <br />
                            <!--a class="btn btn-primary" type="button" data-bs-toggle="collapse" data-target="#collapseForm" role="button" aria-expanded="false" aria-controls="collapseForm">
                        Crea un articolo <i class="fa fa-plus ml-2" aria-hidden="true"></i>
                    </a ----->
                            <a class="btn btn-primary" href="#collapseExample" data-bs-toggle="collapse" role="button"
                                aria-expanded="false" aria-controls="collapseExample">
                                Crea un articolo
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div class="collapse" id="collapseExample">
                    <div class="form-group">
                        <label>Titolo</label>
                        <input v-model="post.title" type="text" name="titolo" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Racconta qualcosa qui:</label>
                        <textarea v-model="post.body" name="email" class="form-control"></textarea>
                    </div>
                    <div class="form-group mt-3">
                        <button v-show="!edit" type="button" class="btn btn-primary" @click="createPost">
                            Invia l'articolo
                        </button>
                        <button v-show="edit" type="button" class="btn btn-primary" @click="updatePost">
                            Modifica articolo
                        </button>
                    </div>
                </div>
                <hr />

                <div class="container d-flex flex-wrap">
                    <div class="card m-2" style="width: 18rem" v-for="post in list" :key="post.id">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title w-75">{{ post.title }}</h5>
                                <div v-if="current_user_id == post.customer.id"
                                    class="w-25 d-flex justify-content-evenly">
                                    <span @click="showPost(post)"><a @click="showPost(post)" class="fa fa-edit fa-lg"
                                            data-bs-toggle="collapse" href="#collapseExample" role="button"
                                            aria-expanded="false" aria-controls="collapseExample"></a></span>
                                    <span @click="deletePost(post.id)"><a class="fa fa-times fa-lg"
                                            style="color: red; cursor: pointer"></a></span>
                                </div>
                            </div>

                            <p class="card-text">{{ post.body }}</p>
                            <small @click="goToUserProfile(post.customer.id)" style="cursor: pointer;" class="fw-bold fst-italic mt-auto mb-1">{{
                post.customer.name
              }}</small>
                            <a :href="'/post/' + post.id" class="btn btn-primary">Go to the article</a>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                current_user_id: localStorage.getItem("userid"),
                edit: false,
                list: [],
                total: "",
                message: "",
                post: {
                    title: "",
                    body: "",
                    id: "",
                },
                baseUrl: "http://localhost:8080",
                url: "/api/posts",
                pagination: [],
            };
        },
        mounted: function () {
            this.fetchPostsList();
        },
        
        methods: {
            fetchPostsList: function () {
                console.log("Fetching contacts...");
                axios
                    .get(this.baseUrl + this.url)
                    .then((response) => {
                        console.log(response.data);
                        this.list = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
goToUserProfile: function(author_id) {
        window.location.href = '/profile/' + author_id;
    },
            createPost: function () {
                let self = this;
                self.edit = false;
                const postParameters = {
                    title: self.post.title,
                    body: self.post.body,
                    customer_id: +this.current_user_id,
                };

                axios
                    .post(this.baseUrl + "/api/posts", postParameters)
                    .then(function () {
                        self.fetchPostsList();
                        self.post.title = "";
                        self.post.body = "";
                        self.post.id = "";
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showPost: function (post) {
                let self = this;
                console.log(post);
                self.post.id = post.id;
                self.post.title = post.title;
                self.post.body = post.body;
                self.edit = true;
            },
            updatePost: function () {
                let self = this;
                const putParameters = {
                    title: self.post.title,
                    body: self.post.body,
                };
                //let postForm =  getFormData(putParameters);
                axios
                    .put(this.baseUrl + this.url + "/" + self.post.id, putParameters)
                    .then(function () {
                        self.fetchPostsList();
                        self.post.title = "";
                        self.post.body = "";
                        self.post.id = "";
                        self.edit = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            deletePost: function (id) {
                let self = this;
                axios
                    .delete(this.baseUrl + "/api/posts/" + id)
                    .then(function (response) {
                        self.fetchPostsList();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    };
</script>