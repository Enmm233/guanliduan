<template>
  
</template>

<script>
export default {
    mounted() {
      // alert(this.$route.query.id)
      var name=this.$route.name;
      if(name=='shiji_user'||name=='shiji_distri'||name=='shiji_problem'||name=='shiji_vehicle')
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

