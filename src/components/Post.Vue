<template>
  <div>
    <app-navbar></app-navbar>
    <div id="singleArticle" class="container mt-3">
      <div class="row">
        <div class="col-12">
          <h3>{{ post.title }}</h3>
        </div>
      </div>

      <p>{{ post.body }}</p>
      
      <small class="text-muted">{{ post.author }}</small>
      <h4 class="mt-3">Commenti</h4>
      <div
        class="comment-section"
        v-for="comment in post.comments"
        :key="comment.id"
      >
        <div class="single-comment">
          <span class="comment-author">{{ comment.customer.name }}</span>
          <span>{{ comment.body }}</span>
        </div>
      </div>

      <form action="#">
        <!----@submit.prevent="edit ? updateContact(contact.id) : createPost()--->
        <div class="form-group">
          <label>Inserisci qui il commento:</label>
          <textarea v-model="comment.body" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary comment-input"
            @click="createComment"
          >
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    lastUrlString: window.location.href.split("/"),
      baseUrl: "http://localhost:8080",
      url: "/api/posts",
      post: {
        id: "",
        title: "",
        author: "",
        body: "",
        comments: [],
      },
      comment: {
        body: "",
      },
    };
  },
  mounted: function () {
    this.fetchSinglePost();
    this.fetchComments();
  },
  methods: {
    fetchComments: function () {
      let url = this.baseUrl + "/api/comments/ofPost/" + this.lastUrlString[this.lastUrlString.length - 1];
      let self = this;
      axios.get(url).then((response) => {
              console.log("Fetching comments...");
        this.post.comments = response.data;
      });
    },
    fetchSinglePost: function () {
      console.log("Fetching posts...");
      let self = this;
      axios
        .get(
          this.baseUrl +
            this.url +
            "/" +
            this.lastUrlString[this.lastUrlString.length - 1]
        )
        .then((response) => {
          self.post.author = response.data.customer.name;
          self.post.title = response.data.title;
          self.post.body = response.data.body;
          self.post.id = response.data.id;
          console.log(self.post);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createComment: function () {
      let self = this;
      const regex = /^[0-9]*/;
      const commentParameters = {
        body: self.comment.body,
        customer_id: localStorage.getItem("userid"),
        post_id: this.lastUrlString[this.lastUrlString.length - 1].match(regex)[0],
      };
      console.log(commentParameters);
      axios
        .post(this.baseUrl + "/api/comments", commentParameters)
        .then(function () {
          self.fetchComments();
          self.comment.body = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.inline {
  display: inline;
}
.section-wrapper {
  /* border-left: 2px solid orange; */
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px 15px;
}

.comment-author,
.article-author {
  color: orange;
  margin-right: 5px;
}

.article-author {
  font-weight: bold;
}

.single-comment {
  padding: 5px 0;
}

.comment-input {
  margin-top: 20px;
}
</style>
