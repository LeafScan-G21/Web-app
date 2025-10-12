module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "classic", development: true }],
  ],
  // Transform Vite's import.meta.env access to process.env for Jest
  plugins: [
    ["babel-plugin-transform-vite-meta-env", { replace: "process.env" }],
  ],
};
