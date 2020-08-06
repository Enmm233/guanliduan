<template>
  
</template>

<script>
export default {
    mounted() {
      // alert(this.$route.query.id)
      var name=this.$route.name;
      if(name=='guanli_index' || name=='guanli_user' || name=='guanli_inquiry' || name=='guanli_problem' || name=='guanli_change' || name=='guanli_record' || name=='guanli_profit' || name=='guanli_profitdetail' || name=='guanli_useracc'  || name=='guanli_purchase'  ||  name=='guanli_useraccdetails')
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

