const baseUrl = 'http://localhost:3000'
new Vue({
    el: '#app',
    data: {
        truncate: true,
        test: 'masuk',
        isLogin: false,
        userId: "",
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
        dataArticle: {
            img: '',
            title: '',
            body: '',
            createdAt: ''
        },
        articles: [],
        newArticle: {
            img: '',
            title: '',
            body: '',
            createdAt: ''
        },
        editArticle: {
            id: '',
            img: '',
            title: '',
            body: '',
            createdAt: ''
        },
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    created: function() {
        this.checkLogin()
        this.retrieveArticle()
        this.userId = localStorage.getItem('userId')
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
                this.articles = response.data
                console.log(this.articles, 'ini article dari retrieve')
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
                this.userId = localStorage.getItem('userId')
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
        getDataImage(event) {
            this.newArticle.img = event.target.files[0]  
        },
        addArticle() {
            let formData = new FormData()
            formData.append('file', this.newArticle.img)
            formData.append('title', this.newArticle.title)
            formData.append('body', this.newArticle.body)
            console.log(formData, 'ini form data')
            axios({
                method: "POST",
                url: `${baseUrl}/articles`,
                data: formData,
                headers: {
                    "token" : localStorage.getItem('token')
                }
            })            
            .then(({data}) => {
                console.log(data)
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
            Swal.fire({
                title: 'Are you sure edit article?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, edit it!'
            }).then((result) => {
                if (result.value) {
                    // console.log(id)
                    this.changePage('List Article')
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
                }
            })
        },
        editingArticle(i) {
            axios({
                method: "GET",
                url: `${baseUrl}/articles/${i}`,
                headers: {
                    "token" : localStorage.getItem('token')
                }
            })     
            .then(response => {
                this.editArticle.id = response.data._id
                this.editArticle.img = response.data.img
                this.editArticle.title = response.data.title
                this.editArticle.body = response.data.body
                this.editArticle.createdAt = response.data.createdAt
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        changePage(where){
            this.pageDirection = where
        },
        checkLogin() {
            if (localStorage.getItem('token')) {
                this.isLogin = true
            }
        },
        fullArticle(i) {
            axios({
                method: "GET",
                url: `${baseUrl}/articles/${i}`,
                headers: {
                    "token" : localStorage.getItem('token')
                }
            })     
            .then(response => {
                this.dataArticle.img = response.data.img
                this.dataArticle.title = response.data.title
                this.dataArticle.body = response.data.body
                this.dataArticle.createdAt = response.data.createdAt
            })
            .catch(err => {
                console.log(err)
            }) 
        },
    },
    computed: {
        filteredArticle() {
            let filter = this.articles.filter(artcl => {
                return artcl.title.toLowerCase().includes(this.search.toLowerCase())
            })
            if (filter.length === 0) return this.articles
            else return filter
        }
    }
})