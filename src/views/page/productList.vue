<template>
  <div class="product-list">
    <!-- 搜素框 -->
    <search-box @submit="searchSubmit" />

    <!-- 表格 -->
    <productTable />
  </div>
</template>

<script>
import searchBox from "@/components/search.vue";
import productTable from "@/components/productsTable.vue";
// import api from "@/api/product";
// import categoryApi from "@/api/category";
export default {
  data() {
    return {
      searchForm: {}
    };
  },
  components: {
    searchBox,
    productTable
  },
  async created() {},
  methods: {
    searchSubmit(form) {
      console.log(form);
      this.searchForm = form;
    }
  }
};
</script>