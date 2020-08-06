<template>
  
</template>

<script>
export default {
    mounted() {
      // alert(this.$route.query.id)
      var name=this.$route.name;
      if(name=='caigou_user' || name=='caigou_inquiry' || name=='caigou_problem' || name=='caigou_change')
      {
        $("body").addClass("active");
      }
      else
      {
         $("body").removeClass("active");
      }
    }
}
</script>

