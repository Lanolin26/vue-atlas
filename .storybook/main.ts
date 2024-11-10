import type { StorybookConfig } from "@storybook/vue3-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
    staticDirs: ["../public", "../src/fonts", "../src/vendor"],
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-docs",
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
    ],
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
};
export default config;
