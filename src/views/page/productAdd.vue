<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-info v-if="current === 0" @next="next" :form="form" />
      <sale-info v-else-if="current === 1" @next="next" @prev="prev" :form="form" />
    </div>
  </div>
</template>

<script>
import BasicInfo from "@/components/basicDetail.vue";
import SaleInfo from "@/components/saleDetail.vue";
import api from "@/api/product";
export default {
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: "",
        inventory: 0,
        images: []
      },
      steps: [
        {
          title: "填写商品基本信息"
        },
        {
          title: "填写商品销售信息"
        }
      ]
    };
  },
  components: {
    BasicInfo,
    SaleInfo
  },
  // 回显数据
  created() {
    const { id } = this.$route.params;
    if (id) {
      api.detail(id).then(res => {
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form
      };
      if (this.current === 1) {
        // 提交数据
        if (this.$route.params.id) {
          // 编辑页面
          api.edit(this.form).then(res => {
            // console.log(res);
            this.$message.success("修改成功");
            this.$router.push({
              name: "ProductList"
            });
          });
        } else {
          // 新增页面
          api.add(this.form).then(res => {
            // console.log(res);
            this.$message.success("新增成功");
            this.$router.push({
              name: "ProductList"
            });
          });
        }
      } else {
        this.current++;
      }
    },
    prev() {
      this.current -= 1;
    }
  }
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