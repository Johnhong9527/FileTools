import Vue from 'vue';
import Router from 'vue-router';
import finderComponent from '@/components/finderPage';
import videoComponent from '@/components/videoPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/finder',
      name: 'finder-page',
      component: finderComponent,
    },
    {
      path: '/video',
      name: 'video-page',
      component: videoComponent,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
