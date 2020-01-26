<template>
  <div class="box">
    <div class="tool">这里是功能区</div>
    <div class="path">{{path}}</div>
    <div class="back">
      <div @click="back">back</div>
    </div>
    <div class="folder-wrapper">
      <div class="folder" v-for="(item,index) in root" :key="item.name+index">
        <div @click="getRoot(item.path)">{{item.name}}</div>
      </div>
    </div>

  </div>
</template>
<script>
  // eslint-disable-next-line import/no-extraneous-dependencies,no-unused-vars
  import { shell } from 'electron';
  // const fs = require('fs');
  import fs from 'fs';
  import _path from 'path';


  export default {
    name: 'finder',
    data() {
      return {
        rootPath: '/Volumes',
        path: '',
        root: [],
      };
    },
    created() {
      this.getRoot(this.rootPath);
    },
    methods: {
      async getRoot(path) {
        if (this.isDirectory(path)) {
          const rootPath = await fs.readdirSync(path);
          this.path = path;
          setTimeout(() => {
            this.root = [];
            console.log(rootPath);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < rootPath.length; i++) {
              if (rootPath[i].search(/^\./) < 0) {
                this.root.push({
                  name: rootPath[i],
                  path: `${path}/${rootPath[i]}`,
                });
              }
            }
          });
        } else {
          const extname = _path.extname(path);
          if (!this.isExtract(extname)) {
            if (this.isVideo(extname)) {
              await this.$router.push({
                path: '/video',
                query: {
                  filePath: path,
                },
              });
            } else {
              shell.openItem(path);
            }
          }
        }
      },
      back() {
        let path = this.path.split('/');
        path = path.filter(el => el !== '');
        let newPath = '';
        if (path.length > 1) {
          console.log(path);
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < path.length - 1; i++) {
            newPath += `/${path[i]}`;
          }
          console.log(newPath);
          this.getRoot(newPath);
        }
      },
      isExtract(name) {
        return name.search(/\.(7z|zip|rar)/g) > -1;
      },
      isVideo(name) {
        return name.search(/\.(mp4)/g) > -1;
      },
      isDirectory(path) {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();// true || false 判断是不是文件夹
        /* fs.stat(path, (err, stats) => {
          if (err) return err;
          console.log(stats);
          return stats.isDirectory();
        }); */
      },
      isFile(path) {
        return new Promise((resolve, reject) => {
          fs.stat(path, (err, stats) => {
            if (err) reject(err);
            console.log(stats);
            resolve(stats.isFile());
          });
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  .box {
    padding: 10px;
    font-size: 25px;

    .folder-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      /*flex-wrap: wrap;*/

      .folder {
        border: 1px solid saddlebrown;
        background-color: #4fc08d;
        /*width: 150px;*/
        text-align: center;
        margin: 10px 0;
        /*padding: 10vw 10px;*/
      }
    }

  }

</style>
