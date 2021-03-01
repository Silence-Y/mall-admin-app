<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{name: 'ProductAdd'}">添加商品</router-link>
    </a-button>

    <!-- 表格 -->
    <productTable
      :data="tableData"
      :page="page"
      @change="changePage"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import searchBox from "@/components/search.vue";
import productTable from "@/components/productsTable.vue";
import api from "@/api/product";
import categoryApi from "@/api/category";

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1
      },
      // 将数组变为对象
      categoryObj: {}
    };
  },
  components: {
    searchBox,
    productTable
  },
  async created() {
    await categoryApi.list().then(res => {
      // 是一个数组
      this.categoryList = res.data;
      // 将数组变为对象
      res.data.forEach(item => {
        this.categoryObj[item.id] = item;
        // console.log(this.categoryObj);
      });
    });
    this.getTableData();
  },
  methods: {
    // 搜索功能
    searchSubmit(form) {
      this.searchForm = form;
      // console.log(this.searchForm);
      this.getTableData();
    },

    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm
        })
        .then(res => {
          // console.log(res);
          this.page.total = res.total;
          // this.tableData = res.data;
          this.tableData = res.data.map(item => ({
            ...item,
            categoryName: this.categoryObj[item.category].name
          }));
        });
    },
    // 翻页功能
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    // 编辑
    editProduct(recode) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id
        }
      });
    },
    // 删除
    removeProduct(recode) {
      this.$confirm({
        title: "确认删除",
        content: () => (
          <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>
        ),
        onOk: () => {
          api.remove({ id: recode.id }).then(() => {
            console.log(this);
            this.getTableData();
          });
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "confirm-box"
      });
    }
  }
};
</script>

<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>