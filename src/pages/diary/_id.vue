<template lang="pug">
div(v-if="diaryPost")
  h1 {{ diaryPost.fields.title }}
  AppMarkdown(:source="diaryPost.fields.body")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Entry } from 'contentful';
import AppMarkdown from '@/components/AppMarkdown.vue';
import { DiaryPost } from '@/types';

@Component({
  components: {
    AppMarkdown,
  },
  head(this: DiaryPostPage) {
    return {
      title: this.diaryPost?.fields.title,
    };
  },
})
export default class DiaryPostPage extends Vue {
  /** 日記のID */
  get id(): string {
    return this.$route.params.id;
  }

  /** 日記のポスト */
  get diaryPost(): Entry<DiaryPost> | undefined {
    return this.$contentful.getDiaryPost(this.id);
  }
}
</script>

<style lang="scss" scoped></style>
