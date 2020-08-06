<template>
  
</template>

<script>
export default {
    mounted() {
      // alert(this.$route.query.id)
      var name=this.$route.name;
      if(name=='gongying_user' || name=='gongying_inquiry' || name=='gongying_problem' || name=='gongying_change')
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

