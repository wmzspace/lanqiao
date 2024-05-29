<template>
  <div class="modify container">
        <section class="content bgcolor-6">
          <span class="input input--juro">
            <input :ref="input" class="input__field input__field--juro" type="text" id="passwordOne"/>
            <label class="input__label input__label--juro" for="input-28">
              <span id="passwordOneVerify" class="input__label-content input__label-content--juro">请输入密码</span>
            </label>
          </span>
          <span class="input input--juro">
            <input :ref="input" class="input__field input__field--juro" type="text" id="passwordTwo"/>
            <label class="input__label input__label--juro" for="input-29">
              <span id="passwordTwoVerify" class="input__label-content input__label-content--juro">请再次输入密码</span>
            </label>
          </span>
        </section>
        <el-button type="primary" id="alter">修改</el-button>
      </div>
</template>

<script>
const { ref, onMounted, } = Vue
module.exports= {
  setup() {
    // TODO:补全代码实现目标效果



    // ***此部分代码不用修改***
    //#region 
    const inputs = ref([])
    const input = (el) => {
      inputs.value.push(el)
    }
    onMounted(() => {
      inputs.value.map(el => {
        if (el.value.trim() != "") {
          el.parentNode.classList.add('input--filled')
        }
        el.onfocus = function () {
          el.parentNode.classList.add('input--filled')
        }
        el.onblur = function () {
          if (this.value.trim() != "") {
            el.parentNode.classList.add('input--filled')
          } else {
            el.parentNode.classList.remove('input--filled')
          }
        }
      })
    })
    //#endregion
    // **********************

    return {
      input
    }
  }
}
</script>

<style scoped>

</style>