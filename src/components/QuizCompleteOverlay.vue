<template>
<div class="w-screen h-screen  absolute z-30 bg-black bg-opacity-60 flex justify-center items-center " >
    <div class=" bg-green-700 p-4 text-center rounded-md">
        <p class=" text-white text-2xl">All Done!</p>
        <p class="my-4 font-bold text-white text-3xl ">{{ total }} Score</p>
        
        <div class="flex justify-center">
            <div class="border rounded-full w-28 py-1 text-white cursor-pointer mx-2 hover:text-black hover:bg-white">Done</div>
            <div class="border rounded-full w-28 py-1 text-white cursor-pointer mx-2  hover:text-black hover:bg-white">Retry</div> 
        </div>
    </div>
</div>
  
</template>

<script>

export default {
    props:[
        "total"
    ],

    setup(props){
        console.log(props.total)
    }
}
</script>

<style>

</style>