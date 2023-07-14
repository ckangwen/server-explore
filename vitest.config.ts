import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";
// import swc from "rollup-plugin-swc";
import { resolve } from "path";

// const swcPlugin = (() => {
//   const plugin = swc({
//     test: "ts",
//     jsc: {
//       parser: {
//         syntax: "typescript",
//         dynamicImport: true,
//         decorators: true,
//       },
//       target: "es2021",
//       transform: {
//         decoratorMetadata: true,
//       },
//     },
//   });

//   const originalTransform = plugin.transform!;

//   // eslint-disable-next-line consistent-return
//   function transform(...args: any[]) {
//     if (!args[1].endsWith("html")) {
//       // @ts-ignore apply
//       return originalTransform.apply(this, args);
//     }
//   }


//   return { ...plugin, transform };
// })();

export default defineConfig({
  test: {
    include: ["**/*.spec.ts", "**/*.e2e-spec.ts"],
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  // esbuild can not emit ts metadata
  esbuild: false,

  plugins: [
    swc.vite(),
  ],
});
