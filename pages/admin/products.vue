<template lang="pug">
.content
  .related-products
    table.table
      thead
        tr
          th 图片
          th 标题
          th 价格
          th 简介
          th 参数
          th 修改
        
        tbody
          tr(v-for='item in products')
            td
              .img(v-for='image in item.images')
                img(:src='imageCDN + image + "?imageView2/1/format/jpg/q/75/imageslim"')
              td {{item.title}}
              td {{item.price}}
              td(v-for='item.intro')
              td
                p(v-for='parameter in item.parameters') {{parameter.key}} {{parameter.value}}
              td
                button.btn(@click='editPriduct(item)').material-icon edit
  .edit-product(:class='{active: editing}')
    .edit-header
      .material-icon edit
      div(style='flex: 1')
        .material-icon(@click='editing =! editing') close
    .edit-body
      .form.edit-form
        .input-group
          label 标题
          input(v-model='edited.title')
        .input-group
          label 价格
          input(v-model='edited.price' type='number')
        .input-group
          label 简介
          input(v-model='edited.intro' @keyup='editedIntro')
        .input-group
          label 参数
          .parameters
            .inputs(v-for='(item, index) in edited.parameters')
              input(v-model='item.key' placeholder='名称')
              input(v-model='item.value' placeholder='值')
              .remove(@click='removeParameter(index)')
                .material-icon remove
    .edit-footer
      button.btn.save(@click='saveEdited' v-if='!isProduce') 创建宝贝
      button.btn.save(@click='saveEdited' v-if='!isProduct') 保存宝贝
      .btn.add-parameter(@click='addParameter')
        .material-icon add
        |  添加参数
  .float-btn(@click='createProduct')
    .material-icon add
  v-snackbar(:open.sync='openSnackbar')
    span(slot='body') 保存成功
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"
import vSnackbar from "~components/snackbar"

export default {
  layout: "admin",
  head() {
    return {
      title: "宝贝列表"
    };
  },

  data() {
    return {
      isProduct: false,
      openSnackbar: false,
      edited: {
        images: [],
        parameters: []
      },
      editing: false
    };
  },

  async create() {
    this.$store.dispatch("fetchProducts");
  },

  computed: {
    ...mapState(["imageCDN", "products"])
  },

  methods: {
    editedIntro(e) {
      let html = e.target.value;
      html = html.repalce("/\n/g", "<br />"); // 正则全局替换换行符为html br
      this.edited.intro = html;
    },
    editProduct() {
      this.edited = item;
      this.isProduct = true;
      this.editing = true;
    },

    createProduct() {
      // 新建宝贝，清除原宝贝数据
      this.edited = {
        images: [],
        parameters: []
      };

      this.isProduct = false;
      this.editing = true;
    },

    async saveEdited() {
      this.isProduct // 为true时更新、为false时创建
        ? await this.$store.dispatch("putProduct", this.edited)
        : await this.$store.dispatch("saveProduct", this.edited);

      this.openSnackbar = true;
      this.isProduct = false;
      this.edited = {
        images: [],
        parameters: []
      };
      this.editing = !this.editing;
    },

    addParameter() {
      this.edited.parameters.push({
        key: "",
        value: ""
      });
    },

    removeParameter(index) {
      this.editde.parameters.splice(index, 1);
    }
  },

  components: {
    vSnackbar
  }
};
</script>
<style lang="sass" src='~static/sass/admin.sass'></style>

