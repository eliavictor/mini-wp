<template>
  <div>
    <!-- NAVBAR -->
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark" style="color:white;">
      <ul class="navbar-nav justify-content-start" style="margin-left: 6%;">
          <li class="nav-item">
              <a class="nav-link pointer" @click.prevent="changePage('List Article')" id="home">Mini-WP</a>
          </li>
      </ul>
      <ul class="navbar navbar-expand-sm bg-dark navbar-dark ml-auto" style="color:white; margin-right: 6%; margin-top: 1%; height: 15px">
          <li class="nav-item pointer ml-auto" style="color: #343A40;">
              <form class="form-inline">
                  <input class="form-control mr-sm-2" type="text" placeholder="Search by title" v-model="search">
                  <button class="btn btn-link pointer" type="submit" style="color: white;"><i class="fas fa-search"></i></button>
                  <a class="nav-link pointer" style="color:#909394" v-show="isLogin" @click.prevent="signOut">SIGNOUT</a>
                  <a class="btn btn-link pointer" data-toggle="modal" data-target="#signinModal" style="color: white;" v-show="!isLogin"><i class="fas fa-user"></i></a>
              </form>
          </li>
      </ul>
      </nav>
    <!-- MAIN -->
      <div class="container-float" style="background-image: url(https://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/black-and-white-wallpaper-5.jpg); background-size: 100%; background-repeat: no-repeat; height: 500px;">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 card text-dark" style="margin-top: 7%; background-color: rgba(255, 255, 255, 0.9); text-align: center;">
                <div class="card-body"><h1>Mini-WP</h1></div>
            </div>
            <div class="col-4"></div>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10 card text-dark" style="margin-top: 7%; background-color: rgba(255, 255, 255, 1); text-align: center; height: auto; margin-bottom: 10%;">
                <div class="card-body margin-bottom:30%;">
                    <div class="row">
                        <div class="col-3"></div>
                        <!-- SIDEBAR -->
                        <div class="sidebar col-3" style="height: 45px;" v-if="pageDirection === 'List Article' || pageDirection === 'Add Article' || pageDirection === 'Edit Article' || pageDirection === 'Gallery List'">
                            <button type="button" class="btn btn-dark" style="margin-top: 5%; margin-left: -25%; width: 80%;" @click.prevent="changePage('Add Article')">Add Article</button>
                            <button type="button" class="btn btn-dark" style="margin-top: 5%; margin-left: -25%; width: 80%;" @click.prevent="changePage('List Article')">Article List</button>
                            <button type="button" class="btn btn-dark" style="margin-top: 5%; margin-left: -25%; width: 80%;" @click.prevent="changePage('Gallery List')">Gallery List</button>
                            <!-- <button type="button" class="btn btn-dark" style="margin-top: 5%; width: 90%; margin-right: 5%" @click.prevent="toListPage">Back to top </i></button> -->
                        </div>
                        <!-- ADD ARTICLE -->
                        <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Add Article'">
                            <headers :title="pageDirection" @title-changed="test = $event"></headers>
                            <form @submit.prevent="addArticle">
                                <div class="form-group row">
                                    <label class="col-2" style="margin-top: 1%" for="img">Image:</label>
                                    <input type="text" class="col-10 form-control" v-model="newArticle.imgArticle">
                                    <!-- <div class="custom-file col-10">
                                        <input type="file" class="custom-file-input" id="customFile">
                                        <label class="custom-file-label" for="customFile" style="text-align: left;">Choose file</label>
                                    </div> -->
                                </div>
                                <div class="form-group row">
                                    <label class="col-2" style="margin-top: 1%" for="title">Title:</label>
                                    <input type="text" class="col-10 form-control" v-model="newArticle.titleArticle">
                                </div>
                                <div class="form-group row">
                                    <label class="col-2" style="margin-top: 1%" for="content">Body:</label>
                                    <!-- <wysiwyg class="col-10" style="text-align:left;" name="content" v-model="newArticle.bodyArticle"></wysiwyg> -->
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; margin-left: 6%; width: 100%;">Add Article</button>
                                </div>
                            </form>
                        </div>
                        <!-- EDIT ARTICLE -->
                        <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Edit Article'">
                            <headers :title="pageDirection" @title-changed="test = $event"></headers>
                            <form @submit.prevent="submitEdit">
                                <div class="form-group row">
                                    <label class="col-2" style="margin-top: 1%" for="img">Image:</label>
                                    <input type="text" class="col-10 form-control" v-model="editArticle.img">
                                    <!-- <div class="custom-file col-10">
                                        <input type="file" class="custom-file-input" id="customFile">
                                        <label class="custom-file-label" for="customFile" style="text-align: left;">Choose file</label>
                                    </div> -->
                                </div>
                                <div class="form-group row">
                                    <label class="col-2" style="margin-top: 1%" for="title">Title:</label>
                                    <input type="text" class="col-10 form-control" v-model="editArticle.title">
                                </div>
                                <div class="form-group row">
                                    <label class="col-2" style="margin-top: 1%" for="content">Body:</label>
                                    <!-- <wysiwyg class="col-10" style="text-align:left;" name="content" v-model="editArticle.body"></wysiwyg> -->
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; margin-left: 6%; width: 100%;">Edit Article</button>
                                </div>
                            </form>
                        </div>
                        <!-- ARTICLE -->
                        <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'List Article'">                           
                            <headers :title="pageDirection" @title-changed="test = $event"></headers>
                            <card :login="isLogin" v-for="(data, index) in filteredArticle" :article="data"></card>
                            <!-- PAGINATION -->
                            <ul class="pagination pagination-sm" style="float: right; margin-right: 4%;">
                                <!-- <li class="page-item"><a class="page-link" href="#" style="background-color: white; color: #343A40;">Previous</a></li> -->
                                <li class="page-item"><a class="page-link" href="#" style="background-color: #343A40;; color: white;"><i class="fas fa-chevron-up"></i></a></li>
                                <!-- <li class="page-item"><a class="page-link" href="#" style="background-color: white; color: #343A40;">2</a></li> -->
                                <!-- <li class="page-item"><a class="page-link" href="#" style="background-color: white; color: #343A40;">3</a></li> -->
                                <!-- <li class="page-item"><a class="page-link" href="#" style="background-color: white; color: #343A40;">Next</a></li> -->
                            <!-- </ul> -->
                        </div>
                        <!-- GALLERY -->
                        <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Gallery List'">
                            <headers :title="pageDirection" @title-changed="test = $event"></headers>
                            <div class="row col-12">
                                <div class="col-6" v-for="(data, index) in filteredArticle">
                                    <div class="card border-light text-white">
                                        <img class="card-img" :src="data.img" alt="gallery image">
                                        <div class="card-img-overlay">
                                            <h5 class="card-title pointer" style="text-align: center; margin-top: 48%; background-color: rgba(52,58,64, 0.4); border: 0px;">{{ data.title }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    <!-- FOOTER -->
      <div class="footer">
          <div class="footer-copyright text-center py-3">© 2019 Copyright: 
              <a> Elia Victor</a>
          </div>            
      </div>
  </div>
</template>

<script>
import assets from '../asset/*.*';
export default {
  data: {
        test: 'masuk',
        isActive: false,
        isLogin: false,
        pageDirection: "List Article",
        search: "",
        newUser: {
            nameSignup: '',
            emailSignup: '',
            passwordSignup: '',
        },
        user: {
            nameSignin: '',
            emailSignin: '',
            passwordSignin: '',
        },
        article: [],
        newArticle: {
            img: '',
            title: '',
            body: ''
        },
        editArticle: {
            id: '',
            img: '',
            title: '',
            body: ''
        },
        state: ""
    },
    components: {
        // wysiwyg: vueWysiwyg.default.component,
    },
    created: function() {
        this.checkLogin()
        this.retrieveArticle()
    },
    methods: {
        retrieveArticle() {
            axios({
                method: "GET",
                url: `${baseUrl}/articles`,
                headers: {
                    "token" : localStorage.getItem('token')
                }
            })     
            .then(response => {
                this.article = response.data
                console.log(this.article, 'ini article dari retrieve')
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        signUp() {
            let obj = {
                name: this.newUser.nameSignup,
                email: this.newUser.emailSignup,
                password: this.newUser.passwordSignup
            }
            console.log(obj,'ini obj register')
            axios({
                method: "POST",
                url: `${baseUrl}/users/signup`,
                data: obj,
            })   
            .then(({data}) => {
                console.log(data)
                Swal.fire({
                    title: `Success signup with email ${obj.email}!`,
                    type: 'success'
                })   
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to signup!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            }) 
        },
        signIn() {
            // console.log(this.user.emailSignin, this.user.passwordSignin, 'dari textbox')
            let obj = {
                email: this.user.emailSignin,
                password: this.user.passwordSignin
            }
            axios({
                method: "POST",
                url: `${baseUrl}/users/signin`,
                data: obj
            })      
            .then(({data}) => {
                // console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                localStorage.setItem('userId', data.userId)
                this.isLogin = true
                // console.log(this.user.nameSignin)
                    Swal.fire({
                        title: `Welcome back ${localStorage.getItem('name')}!`,
                        type: 'success'
                    })
                this.user.nameSignin = localStorage.getItem('name')
                this.user.emailSignin = ""
                this.user.passwordSignin = ""   
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to signin!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            }) 
        },
        signOut() {
            Swal.fire({
                title: 'Are you sure?',
                text: "We will miss you!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, signout!'
            })
            .then((result) => {
                if (result.value) {
                    localStorage.clear()
                    this.isLogin = false
                }
            })
        },
        addArticle() {
            let obj = {
                img: this.newArticle.img,
                title: this.newArticle.title,
                body: this.newArticle.body,
                userId: localStorage.getItem('userId')
            }
            axios({
                method: "POST",
                url: `${baseUrl}/articles`,
                data: obj,
                headers: {
                    "token" : localStorage.getItem('token')
                }
            })            
            .then(({data}) => {
                // console.log(data)
                this.newArticle.img = ""
                this.newArticle.title = ""
                this.newArticle.body = ""  
                Swal.fire({
                    title: 'Success create new article!',
                    type: 'success'
                }) 
                this.changePage('List Article')
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to create new article!',
                    text: `${err.message}`,
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        },
        submitEdit() {
            let obj = {
                img: this.editArticle.img,
                title: this.editArticle.title,
                body: this.editArticle.body
            }
            // console.log(obj)
            axios({
                method: "PUT",
                url: `${baseUrl}/articles/${this.editArticle.id}`,
                data: obj,
                headers: {
                    "token" : localStorage.getItem('token')
                }
            })            
            .then(({data}) => {
                console.log(data)
                Swal.fire({
                    title: 'Success edit article!',
                    type: 'success'
                })   
                this.changePage('List Article')
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to edit article!',
                    text: `${err.message}`,
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        },
        editingArticle(i) {
            this.pageDirection = 'edit'
            this.editArticle.id = this.article[i]._id
            this.editArticle.img = this.article[i].img
            this.editArticle.title = this.article[i].title
            this.editArticle.body = this.article[i].body
        },
        changePage(where){
            this.pageDirection = where
            this.isActive = true
        },
        checkLogin() {
            if (localStorage.getItem('token')) {
                this.isLogin = true
            }
        },
        deleteArticle(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    console.log(id)
                    axios({
                        method: "DELETE",
                        url: `${baseUrl}/articles/${id}`,
                        headers: {
                            "token" : localStorage.getItem('token')
                        }
                    })            
                    .then(({data}) => {
                        console.log(data)
                        Swal.fire(
                            'Deleted!',
                            'Your Article has been deleted.',
                            'success'
                        )
                        this.changePage('List Article')
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            title: 'Failed to delete article!',
                            text: `${err.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
                }
            })
        },
    },
    computed: {
        filteredArticle() {
            let filter = this.article.filter(artcl => {
                return artcl.title.toLowerCase().includes(this.search.toLowerCase())
            })
            if (filter.length === 0) return this.article
            else return filter
        }
    }
};
</script>

<style>
</style>