<template>
    <div class="profile">
        <h1> Profile {{userID}}</h1>
    </div>
</template>

<script>
    export default {
        name : 'Profile',
        data(){
            return{
                userID : this.$route.params.user_id
            }
        },
        methods : {
            updateID (){
                this.userID = this.$route.params.user_id
            }
        },
        watch : {
            $route : 'updateID'
        }
    }
</script>