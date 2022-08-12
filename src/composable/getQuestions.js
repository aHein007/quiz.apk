import { db } from "@/firebase/config";
import { ref } from "vue"

let error =ref("");
let questionAll =ref([]);

let allQuestion =async()=>{
  try{
    let res = await db.collection("quiz-apk").get();
    let data=res.docs.map((doc)=>{
       return {...doc.data()}
    })
    questionAll.value =data
    
  }catch(err){
    error.value=err
  }
}


let getQuestions =()=>{
    return {error,allQuestion,questionAll}
}

export default getQuestions