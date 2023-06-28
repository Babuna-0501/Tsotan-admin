<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5">
          <transaction-card />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TransactionCard from "./components/TransactionCard.vue";
  
  export default {
    name: "Order",
    components: {
      TransactionCard,
    },
  };
  </script>
  