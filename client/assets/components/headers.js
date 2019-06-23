Vue.component('headers', {
    props: ['title'],
    data: function() {
        return {
            text: ""
        }
    },
    template: 
    `
    <div>
        <h2 style="margin-top: 3%; text-align: center;" class="default">{{title}}</h2>
        <hr style="width: 100%;">
    </div>
    `,
    // <input type="text" v-model="title"/>
    // watch: {
        // title(){
            // this.$emit('title-changed', this.title)
        // }
    // }
})