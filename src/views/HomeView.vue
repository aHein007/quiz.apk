<template>
  <main class="flex items-center justify-center h-screen bg-gray-200 ">

    
    <!-- quiz-container -->
    <div class="container bg-white rounded-lg shadow-lg px-12 py-6 newShadow">

      
    

    <div>
       <!-- score -->
      <ScoreCount></ScoreCount>
      
      <!-- timmer container -->
     <TimmerCount></TimmerCount>

      <!-- question container -->
      <div class="question rounded-lg bg-gray-100 p-2 text-center font-bold text-gray-800 mt-10">
       <div class="bg-white p-5" >
          {{ currentQuestion.question }}
       </div>
      </div>

      <!-- options container -->
     <div class="mt-8">
       <!-- option container -->
       <div class="newShadow bg-gray-100 rounded-lg p-2 mb-3 relative  option-default transition ease-out duration-500 transform hover:scale-110 "  v-for="(choice,item) in currentQuestion.choices" :key="item" @click="clickAnswer(choice,item)" :ref="optionRef" >
        <div class="absolute top-0 right-0 bg-blue-700 transform rotate-45 py-2 px-2 rounded-md text-white text-center font-bold">
          <p class="transform -rotate-45">+10</p>
        </div>
          <div class="rounded-lg font-bold  flex p-2 text-white">
             <!-- answer id -->
             <div class=" rounded-lg p-3">{{item }}</div>

             <div class="flex items-center pl-6">{{ choice }}</div>
          </div>
      </div>

      </div>

      <!-- progress container -->
      <ProgressCount></ProgressCount>

  </div>
      </div>
    
    
  </main>
</template>
 
<script>


import ProgressCount from '../components/ProgressCount'
import TimmerCount from '../components/TimmerCount'
import ScoreCount from '../components/ScoreCount'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  components: {
    ProgressCount,
    TimmerCount, ScoreCount },

    setup(){
      let questionCounter =ref(0);
      let canClick =ref(true)
      let currentQuestion =ref({
        question:"",
        answer:0,
        choices:[]
      })

      let questions =ref([
        {
        question:" Who is the most powerfull Avenger in Marvel M.C.U?",
        answer:3,
        choices:[
          "Thor" ,"Wanda","DoctorStrange","Captain Marvel"
        ]
        },

        {
        question:" Who is the most powerfull Justice League in DC D.C.E.U?",
        answer:2,
        choices:[
          "GreenLanter" ,"BatMan","SuperMan","WonderWoman"
        ]
        },

       {
        question:"Which programming language is most usefull?",
        answer:0,
        choices:[
          "JavaScirpt" ,"Java","Phyton","Php"
        ]
       },

       {
        question:"On Twitter,what is the charactor limit for Tweet?",
        answer:1,
        choices:[
          "120" ,"100","140","160"
        ]
       }
      ])

      let loadQuestion =()=>{
          // 3                      //0   // 3 error
        if(questions.value.length > questionCounter.value){
          currentQuestion.value =questions.value[questionCounter.value] //4
          questionCounter.value++
         canClick.value=true
        }else{
          console.log("out of quesiton")
          
        }
      }

    //life cycle hook
      onMounted(()=>{
        loadQuestion()
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
        divContainer.classList.add("option-corret");
        divContainer.classList.remove("option-default")
        console.log("your are correct")
        
      }else{
        divContainer.classList.add("option-wrong");
        divContainer.classList.remove("option-default")
        console.log("your are wrong")
       
      }
       canClick.value=false
        removeClass(divContainer)
        }else{
          console.log("can not selected")

        }

}

      let removeClass =(divContainer)=>{
        setTimeout(()=>{
          divContainer.classList.remove("option-corret")
          divContainer.classList.remove("option-wrong")
          divContainer.classList.add("option-default")
          
          
         loadQuestion()
          
        },1000)
      }

      return {currentQuestion,questions,questionCounter,loadQuestion,clickAnswer,optionRef,removeClass}
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