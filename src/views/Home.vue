<template>
  <div>
    <div class="banner j-owl">
       <a :href="banner0.linkurl"><img :src="banner0.imgurl"></a>
    </div>
    <div class="menu-wrap">
      <a v-for="(d, i) in cates" :key="i" class="menu" :href="d.linkurl">
        <div class="menu-icon" :style="{ backgroundImage: `url(${d.imgUrl})` }"></div>
        <div class="menu-name">{{d.title}}</div>
      </a>
    </div>
    <div class="block-wrap">
      <div class="block-wrap-title">
        热点应用
        <a class="more" href="https://app.zjzwfw.gov.cn/wechat/wechat/phone/showMoreService.do?zjolTitleName=%E4%BE%BF%E6%B0%91%E6%9C%8D%E5%8A%A1">更多</a>
      </div>
      <a v-for="(d, i) in apps" :key="i" class="block br" :href="d.linkurl">
        <div class="block-icon" :style="{ backgroundImage: `url(${d.imgUrl})` }"></div>
        <div class="block-name">{{d.title}}</div>
      </a>
    </div>
    <div class="news-wrap">
      <div class="news-wrap-title">
        新闻资讯
      </div>
      <div class="j-news-wrap">
        <a v-for="(d, i) in news" :key="i" class="news" :href="d.linkurl">
          <div class="news-title">{{d.title}}</div>
          <div class="news-desc">{{d.summary}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getMenuList, getNewsList } from '@/services'

export default {
  name: 'Home',
  components: {
  },

  data () {
    return {
      banners: [],
      cates: [],
      apps: [],
      news: []
    }
  },

  computed: {
    banner0 () {
      return {
        linkurl: this.banners[0]?.linkurl,
        imgurl: this.banners[0]?.imgurl
      }
    }
  },

  mounted () {
    getMenuList('banner').then(res => {
      if (res.ret === 1) {
        this.banners = res.data
      }
    })
    getMenuList('cate').then(res => {
      if (res.ret === 1) {
        this.cates = res.data
      }
    })
    getMenuList('app').then(res => {
      if (res.ret === 1) {
        this.apps = res.data
      }
    })
    getNewsList().then(res => {
      if (res.ret === 1) {
        this.news = res.data
      }
    })
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>

.menu-wrap {
  margin-bottom: 15/@rem;
  overflow: hidden;
  background-color: #fff;

  .menu {
    display: inline-block;
    float: left;
    width: 187.5/@rem;
    height: 187.5/@rem;
    padding-top: 20/@rem;
    text-decoration: none;

    .menu-icon {
      width: 96/@rem;
      height: 96/@rem;
      margin: 0 auto;
      background-color: #eee;
      background-size: 100%;
    }

    .menu-name {
      margin-top: 0.1rem;
      font-size: 28/@rem;
      color: #666;
      text-align: center;
    }
  }
}

.block-wrap {
  padding: 15/@rem;
  margin-bottom: 15/@rem;
  overflow: hidden;
  background-color: #fff;

  .block-wrap-title {
    padding-bottom: 20/@rem;
    font-size: 30/@rem;
    font-weight: 600;
    color: #000;
    border-bottom: 2/@rem solid #ddd;

    .more {
      float: right;
      font-size: 28/@rem;
      color: #666;
      text-decoration: none;
    }
  }

  .block {
    box-sizing: border-box;
    display: inline-block;
    float: left;
    width: 180/@rem;
    height: 160/@rem;
    padding-top: 20/@rem;
    margin-top: 20/@rem;
    text-decoration: none;
    border-bottom: 2/@rem solid #ddd;

    &.br {
      border-right: 2/@rem solid #ddd;
    }

    .block-icon {
      width: 65/@rem;
      height: 65/@rem;
      margin: 0 auto;
      background-color: #eee;
      background-size: 100%;
    }

    .block-name {
      margin-top: 0.1rem;
      font-size: 28/@rem;
      color: #666;
      text-align: center;
    }
  }
}

.news-wrap {
  padding: 15/@rem;
  margin-bottom: 15/@rem;
  overflow: hidden;
  background-color: #fff;

  .news-wrap-title {
    padding-bottom: 20/@rem;
    font-size: 30/@rem;
    font-weight: 600;
    color: #000;
    border-bottom: 2/@rem solid #ddd;

    .more {
      float: right;
      font-size: 28/@rem;
      color: #666;
      text-decoration: none;
    }
  }

  .news {
    display: block;
    padding: 15/@rem 0;
    text-decoration: none;

    .news-title {
      margin-bottom: 10/@rem;
      overflow: hidden;
      font-size: 28/@rem;
      color: #000;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .news-desc {
      height: 60/@rem;
      overflow: hidden;
      font-size: 24/@rem;
      line-height: 30/@rem;
      color: #999;
    }
  }
}
</style>
