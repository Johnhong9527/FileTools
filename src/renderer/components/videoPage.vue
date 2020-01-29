<template>
  <div>
    <div class="back">
      <div @click="back">back</div>
    </div>
    <div @click="play" class="btn">filePath</div>
    {{filePath}}
    <br>
    {{port}}
    <div>
      <video
        v-if="port"
        id="my-player"
        class="video-js vjs-theme-city"
        controls
        preload="auto"
        width="640"
        height="264"
        data-setup="{'playbackRates': [1, 1.5, 2]}">
        <source :src="'http://127.0.0.1:'+port+filePath" type="video/mp4"></source>
      </video>
    </div>
  </div>
</template>
<script>
  // eslint-disable-next-line no-unused-vars,import/no-extraneous-dependencies
  import videojs from 'video.js';
  // import path from 'path';
  // eslint-disable-next-line no-unused-vars,import/no-extraneous-dependencies
  import { ipcRenderer, remote } from 'electron';
  // eslint-disable-next-line no-unused-vars
  import fs from 'fs';

  export default {
    name: 'video-page',
    data() {
      return {
        filePath: '',
        port: '',
      };
    },
    created() {
      this.filePath = this.$route.query.filePath;
      this.$nextTick(() => {
        this.play();
      });
    },
    methods: {
      play() {
        ipcRenderer.send('getFilePath', this.$route.query.filePath);
        ipcRenderer.on('getPort', (event, port) => {
          this.port = port;
        });
        // eslint-disable-next-line new-cap
        const myPlayer = new videojs('my-player'); // video 标签中的ID
        myPlayer.ready(() => {
          myPlayer.play();// 调用播放函数
        });
      },
      back() {
        this.$router.push({ path: '/' });
      },
    },
    // 销毁组件
    beforeDestroy() {
    },
  };
</script>


<style lang="less" scoped>
  @import "video-js.min.css";
  @import "../assets/theme-city.css";

  .btn {
    cursor: pointer;
    user-select: none;
    background-color: #4fc08d;
    text-align: center;
    padding: 10px;
    width: 80%;
    border-radius: 10px;
    margin: 20px auto;
    transition: all ease-in-out 500ms;

    &:active {
      background-color: sienna;
    }
  }
</style>
