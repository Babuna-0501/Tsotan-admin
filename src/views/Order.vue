<template>
    <div class="container-fluid">
      <div class="row">
        <div>
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
  