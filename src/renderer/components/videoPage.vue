<template>
  <div>
    {{filePath}}
    <div v-if="filePath && filePath.length>0">
      <video
        id="my-player"
        ref="myplayer"
        class="video-js"
        controls
        preload="auto"
        poster="//vjs.zencdn.net/v/oceans.png"
        data-setup='{}'>
        <source :src="filePath" type="video/mp4"></source>
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  </div>
</template>
<script>
  // eslint-disable-next-line no-unused-vars
  import videojs from 'video.js';

  export default {
    name: 'video-page',
    data() {
      return {
        filePath: '',
      };
    },
    created() {
      console.log(this.$route);
      this.filePath = this.$route.query.fullPath;
    },
    
    mounted() {
      setTimeout(() => {
        console.log(this);
      }, 100);


      // return;
      // // const player = videojs('my-player');
      // const options = {};
      //
      // // eslint-disable-next-line no-unused-vars
      // const player = videojs('my-player', options, function onPlayerReady() {
      //   videojs.log('Your player is ready!');
      //
      //   // In this context, `this` is the player that was created by Video.js.
      //   this.play();
      //
      //   // How about an event listener?
      //   this.on('ended', () => {
      //     videojs.log('Awww...over so soon?!');
      //   });
      // });
    },
  };
</script>
