<template>
  <div class="bg">
    <div class="box">
      <p>TEXT</p>
    </div>
  </div>
</template>


<style scoped lang="scss">
  .bg {
    display: flex;
    width: 500px;
    height: 500px;
    background-image: url('bg.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .box {
    display: flex;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    background-image: url('bg.png');
    mix-blend-mode: screen;

    & p {
      margin: auto;
      font-size: 50px;
      color: #ffffff;
    }
  }
</style>