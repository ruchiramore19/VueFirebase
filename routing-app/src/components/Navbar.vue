<template>
    <div class="main-nav">
        <ul>
            <li><router-link :to ="{name : 'About'}">About</router-link></li>
            <li><router-link :to ="{name : 'Home'}">Home</router-link></li>

        </ul>
        <ul v-for="(id, index) in userIds" :key="index">
            <router-link :to ="{name:'Profile', params:{user_id: id}}">Profile {{id}}</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name : 'Navbar',
        data(){
            return{
                userIds : ['1','2','3','4']
            }
        }
    }
</script>

<style>
ul{
    list-style-type : none;
    padding: 0;
    display: flex;
    flex-flow: row
    }

li{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 25px;
    padding: 20px;

    
}

</style>
