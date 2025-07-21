<template>
  <article
    id="editorjs"
    class="prose prose-neutral dark:text-gray-300"
    :class="props.class"
  ></article>
</template>
<script setup>
import { onMounted, ref } from "vue";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Embed from "@editorjs/embed";
import Alert from "editorjs-alert";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
const props = defineProps({
  article: {
    type: Object,
  },
  class: {
    type: String,
  },
});

const articleData = ref(props.article);

const renderEditor = () => {
  new EditorJS({
    holder: "editorjs",
    data: articleData.value.descriptionJson,
    minHeight: 0,
    readOnly: true,
    tools: {
      header: {
        class: Header,
        levels: [1, 2, 3],
      },
      list: {
        class: List,
      },
      paragraph: {
        class: Paragraph,
      },

      image: {
        class: ImageTool,
      },
      underline: {
        class: Underline,
      },

      Marker: {
        class: Marker,
      },
      inlineCode: {
        class: InlineCode,
      },
      code: {
        class: CodeTool,
      },
      table: {
        class: Table,
      },
      checklist: {
        class: Checklist,
      },
      quote: {
        class: Quote,
      },
      alert: {
        class: Alert,
      },

      embed: {
        class: Embed,
      },
      delimiter: Delimiter,
    },
  });
};

onMounted(() => {
  renderEditor();
});
</script>
