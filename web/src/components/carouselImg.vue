<template>
    <div class="box">
      <div class="content">
        <ul id="img">
          <li style="display: none"><img src="@/assets/img1.jpg" alt=""/></li>
          <li style="display: none"><img src="@/assets/img2.jpg" alt=""/></li>
          <li style="display: none"><img src="@/assets/img3.jpg" alt=""/></li>
        </ul>
        <ul class="number">
          <li @mouseover="show('1')">1</li>
          <li @mouseover="show('2')">2</li>
          <li @mouseover="show('3')">3</li>
        </ul>
      </div>
      <div id="arr">
       <!-- <span id="left"><</span>
        <span id="right">></span>-->
      </div>
    </div>
</template>

<script>
  import $ from 'jquery'
    export default {
      name: 'carousel-img',
      methods: {
        show (item) {
          // let index = $(this).innerHTML
          let num = Number(item)
          console.log(num)
          console.log(typeof (num))
          $('#img').eq(num).css('display', 'inline-block')
        }
      },
      created () {
        var imgNum = $('#img >li')
        console.log(imgNum)
      }
    }
</script>

<style scoped>
.box{
  width: 700px;
  height: 600px;
  margin: 0 auto;
}
  .content{
    width: 700px;
    height: 500px;
  }
  #img{
    width: 700px;
    height: 500px;
    list-style: none;
    padding: 0 0 0 0;
    margin:  0 0 0 0;
    display: inline-block;
  }
#img>li{
  /*width: 700px;*/
  /*height: 500px;*/
  display: inline-block;
}
  img{
    width: 700px;
    height: 500px;
  }
  .number{
    display: inline-block;
    list-style: none;
    padding: 0 0 0 0;
    float: right;
    margin:  0 0 0 0;
    position: relative;
    top: -70px;
  }
.number>li {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: black solid 2px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.number>li:hover{
  background-color: dodgerblue;
  border-color: dodgerblue;
  color: white;
}

</style>
