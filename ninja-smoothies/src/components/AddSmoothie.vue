<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add Your Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">   
            <div class="field title">
                <label for="title">Smoothie Name: </label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing,index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient Name: </label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredients Here: </label>
                <input type="text" name="add-ingredient" v-model="nextIng" @keydown.tab.prevent="AddIngredient">
            </div>
            <div class="center-align">
                <button class="btn pink">Add Smoothie!</button>
            </div>
        </form>
    </div>    
</template>

<script>

import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data(){
        return{
            title : null,
            nextIng : null,
            ingredients: [],
            message : null,
            slug : null
        }
    },
    methods: {
        AddSmoothie(){
            if(this.title){
                this.message=null
                //slugify the title
                this.slug = slugify(this.title,{
                    replacement : '-',
                    remove : /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                //add record to database
                db.collection('smoothies').add({
                    title : this.title,
                    slug : this.slug,
                    ingredients : this.ingredients
                }).then(() =>{
                    this.$router.push({name : 'Index'})
                }).catch(err =>{
                    console.log(err)
                })
            }
            else{
                this.message = 'Please provide a title'
            }
        },

        AddIngredient(){
            if(this.nextIng){
                this.ingredients.push(this.nextIng)
                this.nextIng = null
                this.message = null
            }
            else{
                this.message = 'Please add ingredient !'
            }
        },

        deleteIngredient(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient!= ing
            })
        }
    }
}
</script>
<style>
.add-smoothie{
    margin-top: 60px;
    max-width: 500px;
    padding: 20px;
}

.add-smoothie h2{
    font-size: 30px;
    margin-bottom: 30px
}
.add-smoothie .field{
    position: relative;
    margin: 20px auto
}
.add-smoothie .delete {   
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 20px;
  color: rgb(160, 154, 154);
  cursor: pointer;
}
</style>
