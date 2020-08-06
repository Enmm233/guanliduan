<template>
  
</template>

<script>
export default {
    mounted() {
      // alert(this.$route.query.id)
      var name=this.$route.name;
      if(name=='yewu_user' || name=='yewu_problem' || name=='yewu_change' || name=='yewu_accountadd' || name=='yewu_accountedit')
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

