<template>
  <div>
  <div class="top" :style="{backgroundImage:'url('+ bg_top+')'}">
    <div class="wrapper">
      <div>
        <a href="javascript:void(0);" class="select" :style="{left:positionSize}">{{title||关于我们}}</a>
        <a href="javascript:void(0);" @click="changeContent(1)" style="float: left">关于我们</a>
        <a href="javascript:void(0);" @click="changeContent(2)">合作伙伴</a>
        <a href="javascript:void(0);" @click="changeContent(3)" style="float: right">招贤纳士</a>
      </div>
    </div>
  </div>
    <!-- 内容块 -->
    <!-- 关于我们 -->
    <div class="aboutus" v-show="positionSize==0">
      <div class="wrapper">
        <img :src=aboutus alt="">
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="cooperate"  v-show="positionSize=='472px'">
      <div class="wrapper">
        <img :src=content1 alt="">
      </div>
    </div>
    <!-- 招贤纳士 -->
    <div class="recruit"  v-show="positionSize=='944px'">
      <div class="wrapper">
        <aside>
          <div class="company">
            <div class="title">
              <div></div>
              <h3>公司信息</h3>
            </div>

            <div class="information">
              <ul class="info">
                <li>电政信息科技</li>
                <li><img :src=qizi  alt=""><span>民营公司</span></li>
                <li><img :src=ren  alt=""><span>50-100人</span></li>
                <li><img :src=shuju alt=""><span>大数据挖掘应用</span></li>
              </ul>
              <ul class="welfare">
                <li>五险一金</li>
                <li>员工旅游</li>
                <li>年终奖金</li>
                <li>加班补助</li>
                <li>包住</li>
                <li>通讯补贴</li>
                <li>带薪年假</li>
              </ul>
            </div>
          </div>

          <div class="customservice">
            <div class="title">
              <div></div>
              <h3>联系客服</h3>
            </div>
            <ul>
              <li>
                <img :src=phone alt="">
                <span class="phone">023-67468469</span>
                <span class="time">周一至周五 09:00-18:00</span>
              </li>
              <li>
                <img :src=qq alt="">
                <span class="qq">在线客服QQ:460647886</span>
                <span class="time">周一至周五 09:00-18:00</span>
              </li>
              <li>
                <img :src=dingwei alt="">
                <span class="address">重庆市渝北区光电园双子座B座6-1</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- 招聘职位 -->
        <div class="post">
          <ul>
            <li>
              <section>
                <h3>大数据开发工程师<span>2018-12-10</span></h3>
                <div>
                  <p>学历要求：<span>大专以上</span><span>   |   工作经验：3-5年经验</span><span>   |   招1人</span></p>
                  <button>立即申请</button>
                </div>
                <h4>月薪 : 1.2-1.5W</h4>
                <ul>
                  <li>岗位职责：</li>
                  <li>1、负责业务数据收集整理，对多种数据源进行深度诊断性组合分析、挖掘、深度分析和建模，对相关数据进行深度挖掘分析。</li>
                  <li>2、对公司业务的运营进行评估和建议，从数据的角度推动公司运营决策、产品方向和运营。</li>
                  <li>3、深入理解业务，发现业务特征潜在机会，给出有效的行动建议。</li>
                </ul>
                <ul>
                  <li>任职要求</li>
                  <li>1、精通ORACLE及MYSQL数据库，有扎实的数据库基础。</li>
                  <li>2、精通Madoop, Mapreduce, Hbase, Yarn, Spark 等技术并有3年以上的开发经验。</li>
                  <li>3、交警同impala和Hive的SQL性能优化。</li>
                </ul>
              </section>
            </li>
            <li>
              <section>
                <h3>大数据架构师<span>2018-12-10</span></h3>
                <div>
                  <p>学历要求：<span>大专以上</span><span>   |   工作经验：3-5年经验</span><span>   |   招1人</span></p>
                  <button>立即申请</button>
                </div>
                <h4>月薪 : 1-1.5W</h4>
                <ul>
                  <li>岗位职责：</li>
                  <li>1、负责业务数据收集整理，对多种数据源进行深度诊断性组合分析、挖掘、深度分析和建模，对相关数据进行深度挖掘分析。</li>
                  <li>2、对公司业务的运营进行评估和建议，从数据的角度推动公司运营决策、产品方向和运营。</li>
                  <li>3、成功进行一年数据问题分析及规划解决方案1次。</li>
                </ul>
                <ul>
                  <li>任职要求</li>
                  <li>1、精通ORACLE及MYSQL数据库，有扎实的数据库基础。</li>
                  <li>2、精通Madoop, Mapreduce, Hbase, Yarn, Spark 等技术并有3年以上的开发经验。</li>
                  <li>3、交警同impala和Hive的SQL性能优化。</li>
                </ul>
              </section>
            </li>
          </ul>
          <button>加载更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            bg_top:require('@/assets/images/aboutus/bg_top.jpg'),
            aboutus:require('@/assets/images/aboutus/aboutus.jpg'),
            content:require('@/assets/images/aboutus/content.jpg'),
            content1:require('@/assets/images/aboutus/content1.jpg'),

            dingwei:require('@/assets/images/aboutus/dingwei.png'),
            phone:require('@/assets/images/aboutus/phone.png'),
            qizi:require('@/assets/images/aboutus/qizi.png'),
            qq:require('@/assets/images/aboutus/qq.png'),
            ren:require('@/assets/images/aboutus/ren.png'),
            shuju:require('@/assets/images/aboutus/shuju.png'),
            positionSize:'',
            title:'关于我们',
            titleData:[{
                title:'关于我们'
            },{
                title:'合作伙伴'
            },{
               title:'招贤纳士'
            }]
          }
        },
      methods: {
        changeContent(num){
            if(num==1){
              this.positionSize='0';
              this.title='关于我们';
            }
            else if(num==2){
              this.positionSize='472px';
              this.title='合作伙伴';
            }
            else if(num==3){
              this.positionSize='944px';
              this.title='招贤纳士';
            }
        }
      }
    }
</script>
<style scoped>
a{
  text-decoration: none;
}
  div.service ul.wrapper {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    letter-spacing: 1px;
    justify-content: space-around;
  }

  div.service ul.wrapper > li + li {
    margin-left: 40px;
  }

  div.service ul.wrapper > li ul li {
    margin-top: 12px;
  }

  div.service ul.wrapper > li ul li:first-child {
    font-size: 13px;
    font-weight: bold;
  }

  div.service ul.wrapper > li ul li a {
    color: #7f8385;
  }

  .top {
    height: 294px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .top .wrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .top .wrapper div {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    text-align: center;
  }

  .top .wrapper div a {
    display: inline-block;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    padding: 0 100px;
    color: #fff;
    transition: 0.5s ease-in;
  }

  .top .wrapper div .select {
    background: #078dff;
    position: absolute;
    left: 0;
  }

  body {
    min-width: 1250px;
  }

  div.aboutus {
    margin: 30px 0;
/*    transition: 0.5s ease-in;;*/
  }

  div.aboutus .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  div.aboutus .wrapper img {
    width: 100%;
  }

  div.cooperate {
    margin: 30px 0;
  }

  div.cooperate .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  div.cooperate .wrapper img {
    width: 100%;
  }

  div.recruit {
    background-color: #f2f2f2;
    padding-top: 17px;
  }
  div.recruit:after,
  div.cooperate:after,
  div.wrapper:after{
    content: '';
    clear: both;
    height: 0;
    width: 0;
    display: block;
  }
  div.recruit .wrapper {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    text-align: left;
  }

  div.recruit .wrapper aside {
    width: 300px;
    float: left;
  }

  div.recruit .wrapper aside .company {
    border: 1px solid #e4e4e4;
    border-top: 0;
    border-bottom: 1px solid #c8c8c8;
    padding: 17px;
    padding-bottom: 5px;
    background-color: #fff;
  }

  div.recruit .wrapper aside .company .title {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 10px;
  }

  div.recruit .wrapper aside .company .title div {
    width: 12px;
    height: 24px;
    background-color: #078dff;
    float: left;
    margin-right: 7px;
  }

  div.recruit .wrapper aside .company .title h3 {
    font-size: 17px;
  }

  div.recruit .wrapper aside .company .information ul.info li {
    margin-bottom: 15px;
    color: #555555;
    font-size: 12px;
  }

  div.recruit .wrapper aside .company .information ul.info li:first-child {
    font-size: 15px;
    margin-top: 10px;
    color: #000;
  }

  div.recruit .wrapper aside .company .information ul.info li img {
    margin-right: 10px;
  }

  div.recruit .wrapper aside .company .information ul.welfare li {
    display: inline-block;
    border: 1px solid #078dff;
    color: #078dff;
    width: 30%;
    height: 26px;
    line-height: 26px;
    text-align: center;
    margin-bottom: 12px;
  }

  div.recruit .wrapper aside .customservice {
    border: 1px solid #e4e4e4;
    border-top: 0;
    border-bottom: 1px solid #c8c8c8;
    padding: 17px;
    background-color: #fff;
    margin-top: 20px;
  }

  div.recruit .wrapper aside .customservice .title {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 10px;
  }

  div.recruit .wrapper aside .customservice .title div {
    width: 12px;
    height: 24px;
    background-color: #078dff;
    float: left;
    margin-right: 7px;
  }

  div.recruit .wrapper aside .customservice .title h3 {
    font-size: 17px;
  }

  div.recruit .wrapper aside .customservice ul li {
    padding: 15px 0;
  }

  div.recruit .wrapper aside .customservice ul li img {
    margin-right: 10px;
  }

  div.recruit .wrapper aside .customservice ul li .phone, div.recruit .wrapper aside .customservice ul li .qq, main.recruit .wrapper aside .customservice ul li .address, main.recruit .wrapper aside .customservice ul li .time {
    font-size: 12px;
    color: #555555;
  }

  div.recruit .wrapper aside .customservice ul li .time {
    display: block;
    padding-left: 32px;
  }

  div.recruit .wrapper .post {
    float: left;
    width: 880px;
  }

  div.recruit .wrapper .post ul li + li {
    margin-top: 20px;
  }

  div.recruit .wrapper .post section {
    border: 1px solid #e4e4e4;
    border-top: 0;
    border-bottom: 1px solid #c8c8c8;
    background-color: #fff;
    padding: 15px 20px;
    margin-left: 20px;
  }

  div.recruit .wrapper .post section h3 {
    font-weight: bold;
    font-size: 20px;
  }

  div.recruit .wrapper .post section h3 span {
    float: right;
    font-weight: normal;
    font-size: 13px;
    color: #989898;
  }

  div.recruit .wrapper .post section div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.recruit .wrapper .post section div p {
    color: #989898;
    margin: 10px 0;
  }

  div.recruit .wrapper .post section div button {
    cursor: pointer;
    height: 28px;
    border: 0;
    background-color: #078dff;
    color: #fff;
    padding: 0 15px;
  }

  div.recruit .wrapper .post section h4 {
    color: #fd690f;
    font-size: 18px;
  }

  div.recruit .wrapper .post section ul li {
    color: #989898;
    margin-top: 5px;
  }

  div.recruit .wrapper .post section ul li:first-child {
    color: #000;
    margin-top: 10px;
  }

  div.recruit .wrapper .post > button {
    margin-left: 20px;
    width: 860px;
    color: #fff;
    height: 40px;
    line-height: 40px;
    background-color: #078dff;
    border: 0;
    cursor: pointer;
    margin-top: 10px;
    padding-right: 0;
  }

  .service {
    background-color: #f2f2f2;
    padding-top: 30px;
  }

</style>
