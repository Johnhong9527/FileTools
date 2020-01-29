<template>
  <div>
    <div class="back">
      <div @click="back">back</div>
    </div>
    <div @click="test" class="btn">filePath</div>
    {{filePath}}
    <br>
    {{port}}
    <div>
      <video
        v-if="port"
        id="my-player"
        class="video-js"
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
      ipcRenderer.send('getFilePath', this.$route.query.filePath);
      ipcRenderer.on('getPort', (event, port) => {
        this.port = port;
      });
      this.filePath = this.$route.query.filePath;
      console.log('this.port', this.port);
    },
    mounted() {
      console.log(43, this);
      console.log(this.$route);
      // this.filePath = encodeURI(`file://${this.$route.query.filePath}`);
      // const myPlayer = videojs('my-player'); // video 标签中的ID
      // myPlayer.ready(() => {
      //   myPlayer.play();// 调用播放函数
      // });
    },
    methods: {
      test() {

      },
      back() {
        this.$router.go(-1);
      },
    },
  };
</script>


<style lang="less" scoped>
  @import "video-js.min.css";

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
