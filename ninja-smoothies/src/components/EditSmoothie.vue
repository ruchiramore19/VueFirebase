<template >
    <div v-if="smoothie" class="edit-smoothie container">
        <form @submit.prevent="EditSmoothie">   
            <div class="field title">
                <label for="title">Smoothie Name: </label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient Name: </label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
            </div>
            <div class="field edit-ingredient">
                <label for="edit-ingredient">Add Ingredients Here: </label>
                <input type="text" name="edit-ingredient" v-model="nextIng" @keydown.tab.prevent="AddIngredient">
            </div>
            <div class="center-align">
                <button class="btn pink">Update Smoothie!</button>
            </div>
        </form>
    </div>
</template>

 <script>

 import db from '@/firebase/init'
 import slugify from 'slugify'

 export default {
     name : 'EditSmoothie',
     date() {
         return{
             smoothie : null,
             nextIng : null,
             message: null
         }
     },
     methods : {

         EditSmoothie(){

              if(this.smoothie.title){
                this.message=null
                //slugify the title
                this.smoothie.slug = slugify(this.smoothie.title,{
                    replacement : '-',
                    remove : /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                //add record to database
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title : this.smoothie.title,
                    slug : this.smoothie.slug,
                    ingredients : this.smoothie.ingredients
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
                this.smoothie.ingredients.push(this.nextIng)
                this.nextIng = null
                this.message = null
            }
            else{
                this.message = 'Please add ingredient !'
            }
        },

        deleteIngredient(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient!= ing
            })
        }
     },
     created(){
         let records = db.collection('smoothies').where('slug','==', this.$route.params.smoothie_slug)
         records.get().then(snapshot =>{
             snapshot.forEach(doc => {
                 this.smoothie = doc.data()
                 this.smoothie.id = doc.id
             });
         })
     }
 }
 </script>
 <style>
.edit-smoothie{
    margin-top: 60px;
    max-width: 500px;
    padding: 20px;
}

.edit-smoothie h2{
    font-size: 30px;
    margin-bottom: 30px
}
.edit-smoothie .field{
    position: relative;
    margin: 20px auto
}
.edit-smoothie .delete {   
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 20px;
  color: rgb(160, 154, 154);
  cursor: pointer;
}
</style>
 