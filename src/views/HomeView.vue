<template>
  <main class="flex items-center justify-center h-screen bg-gray-200 ">
    
      <QuizCompleteOverlay v-if="showModel==true" @total="score"></QuizCompleteOverlay>
   
    
    <!-- quiz-container -->
<div class="container bg-white rounded-lg shadow-lg px-12 py-6 newShadow">

      
    

    <div v-if="questionAll.length > 0">
       <!-- score -->
      <div class="text-end text-gray-800">
        <p class="text-md leading-3">Score</p>
        <p class="font-bold text-lg">{{ score }}</p>
      </div>
      
      <!-- timmer container -->
      <div class="bg-white w-full h-5 rounded-lg shadow-lg p-1 border border-gray-100 mt-4">
        <div class=" bg-blue-600 h-full rounded-lg transform duration-300" :style="`width:${timmer}%`"></div>
      </div>

      <!-- question container -->
      <div class="question rounded-lg bg-gray-100 p-2 text-center font-bold text-gray-800 mt-10">
       <div class="bg-white p-5" >
          {{ currentQuestion.question }} 
       </div> 
      </div>

      <!-- options container --> 
     <div class="mt-8"> 
       <!-- option container -->
        <div  class="newShadow bg-gray-100 rounded-lg p-2 mb-3 relative  option-default transition ease-out duration-500 transform hover:scale-110 "  v-for="(choice,item) in currentQuestion.choices" :key="item" @click="clickAnswer(choice,item)" :ref="optionRef" >
          <div class="absolute top-0 right-0 bg-blue-700 transform rotate-45 py-2 px-2 rounded-md text-white text-center font-bold">
            <p class="transform -rotate-45">+10</p>
          </div>
            <div class="rounded-lg font-bold  flex p-2 text-white">
              <!-- answer id -->
              <div class=" rounded-lg p-3">{{item }}</div> 

              <div class="flex items-center pl-6">{{ choice }}</div>
            </div>
       
        </div>
          <!-- progress container -->  
        <div class="mt-10 text-center">
          <div class="bg-gray-800 rounded-lg m-auto w-12 h-1"></div>
          <p>{{ questionCounter }} / {{ questionAll.length }}</p>
        </div>
      
      </div>

     

    </div>
</div>
    
    
  </main>
</template>
 
<script>




 
import QuizCompleteOverlay from '../components/QuizCompleteOverlay'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import getQuestions from "../composable/getQuestions"
export default {
  components: { QuizCompleteOverlay },


    setup(){
      let questionCounter =ref(0);
      let timmer =ref(0);
      let canClick =ref(true)
      let score =ref(0);
      let showModel =ref(false)
      let currentQuestion =ref({
        question:"",
        answer:0,
        choices:[]
      })
 
      


      let {error,allQuestion,questionAll} = getQuestions()
      // allQuestion function ကို console.log() ထုတ် တဲ့ အခါ မှာ data မတွေ့ပါ ဘူး  so  await ပေးလိုက် ပါ တယ် ။  
      
    let loadQuestion =async()=>{ 
      await allQuestion()
     
          // 3                      //0   // 3 error
        if(questionAll.value.length > questionCounter.value){  
          if(questionAll.value){
          timmer.value =0
          currentQuestion.value =questionAll.value[questionCounter.value] //4 
          questionCounter.value++
         canClick.value=true
         
          }
          
        }else{
          console.log("out of quesiton")
          clearInterval(countTimmer)
          showModel.value=true
        } 
      }

    //life cycle hook
   
      
        onMounted(()=>{
          
        loadQuestion() 
        countTimmer()
          
      })
      
     

      //option ref 
      let refClass =[];
      let optionRef =(element)=>{ //ref in element
        if(element){
          refClass.push(element)
        }
       }

let clickAnswer =(choice,item)=>{
        //div Selector
        let divContainer =refClass[item]
        //canClick
      if(canClick.value){
         if(currentQuestion.value.answer == item){
          addScore()
        divContainer.classList.add("option-corret");
        divContainer.classList.remove("option-default")
        console.log("your are correct")
         if(timmer.value == 100){
          countTimmer()
         }
      }else{
        divContainer.classList.add("option-wrong");
        divContainer.classList.remove("option-default")
        console.log("your are wrong")
         if(timmer.value == 100){
          countTimmer()
         }
      }
       canClick.value=false
        removeClass(divContainer)
        }else{
          console.log("can not selected")
          
        }

}
      //when next question remove class
      let removeClass =(divContainer)=>{
        setTimeout(()=>{
          divContainer.classList.remove("option-corret")
          divContainer.classList.remove("option-wrong")
          divContainer.classList.add("option-default")
          
          
         loadQuestion()
          
        },1000)
      }

      //score function
      let addScore =()=>{
        score.value+=10
      }

      //count timmer
      let countTimmer =()=>{
      let startInterval =setInterval(()=>{
        timmer.value+=10
       if(timmer.value === 100){
         clearInterval(startInterval)
          // questionCounter.value++
          // timmer.value =0
       } 
       },1000)
        
        
      }

      return {currentQuestion,questionCounter,loadQuestion,clickAnswer,optionRef,removeClass,score,timmer,showModel,questionAll}
    }

}
</script>


<style scoped>
.newShadow{
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09) ,-6px -6px 18px #ffffff;
}

.container{
 max-width: 400px;
border-radius: 25px;

}

.main{
  width: 100%;
  height: 100%;
}
</style>