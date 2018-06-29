new Vue ({
    el : '#app',
    data : {
        name : 'Max',
        showName : true
    },
    methods : {
        invert(){
            return this.name.split('').reverse().join('')
        },

        toggleShowName(){
            this.showName = !this.showName
        }
    }
 })