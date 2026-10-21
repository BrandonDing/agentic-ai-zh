import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-ext-400.css";
import "@fontsource/jetbrains-mono/latin-ext-500.css";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import BookHome from "./components/BookHome.vue";
import BookContents from "./components/BookContents.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("BookHome", BookHome);
    app.component("BookContents", BookContents);
    if (typeof localStorage === "undefined") return;
    const size = localStorage.getItem("agentic-guide:size");
    if (size && typeof document !== "undefined") {
      document.documentElement.dataset.readingSize = size;
    }
  },
};
