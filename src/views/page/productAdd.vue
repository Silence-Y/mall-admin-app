<template>
  <div class="product-detail">新增商品</div>
</template>

<script>
import BasicInfo from "@/components/basicDetail.vue";
import SaleInfo from "@/components/saleDetail.vue";
export default {
  data() {
    return {};
  },
  components: {
    BasicInfo,
    SaleInfo
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>