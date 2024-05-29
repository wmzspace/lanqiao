<template>
  <div class="account container">
    <section class="content bgcolor-6">
      <span class="input input--juro">
        <input
          :ref="input"
          class="input__field input__field--juro"
          type="text"
          id="userName"
          v-model="form.userName"
        />
        <label class="input__label input__label--juro" for="input-28">
          <span
            id="userNameVerify"
            ref="userNameVerify"
            class="input__label-content input__label-content--juro"
            >用户名</span
          >
        </label>
      </span>
      <span class="input input--juro">
        <input
          :ref="input"
          class="input__field input__field--juro"
          type="text"
          id="idNum"
          v-model="form.idNum"
        />
        <label class="input__label input__label--juro" for="input-29">
          <span
            id="idNumVerify"
            class="input__label-content input__label-content--juro"
            >身份证号</span
          >
        </label>
      </span>
    </section>
    <el-button type="primary" id="nextStep" @click="handleNextStep"
      >下一步</el-button
    >
  </div>
</template>

<script>
const { ref, onMounted } = Vue;
module.exports = {
  name: "account",
  setup() {
    // TODO:补全代码实现目标效果
    const form = Vue.reactive({
      userName: "",
      idNum: "",
    });
    const userNameVerify = ref();
    const validateUserName = () => {
      const userNameReg = /[1-9a-zA-Z\_](3-5)/;
      const isValid = userNameReg.test(form.userName);
      if (isValid) {
        userNameVerify.value.innerText = "用户名";
        userNameVerify.value.classList.remove("wrong");
      } else {
        userNameVerify.value.innerText = "用户名不合法";
        userNameVerify.value.classList.add("wrong");
      }
    };
    const handleNextStep = () => {
      validateUserName();
    };

    // ***此部分代码不用修改***
    //#region
    const inputs = ref([]);
    const input = (el) => {
      inputs.value.push(el);
    };
    onMounted(() => {
      inputs.value.map((el) => {
        if (el.value.trim() != "") {
          el.parentNode.classList.add("input--filled");
        }
        el.onfocus = function () {
          el.parentNode.classList.add("input--filled");
        };
        el.onblur = function () {
          if (this.value.trim() != "") {
            el.parentNode.classList.add("input--filled");
          } else {
            el.parentNode.classList.remove("input--filled");
          }
        };
      });
    });
    //#endregion
    // **********************
    return {
      input,
      handleNextStep,
      form,
      userNameVerify,
    };
  },
};
</script>

<style  scoped>
</style>