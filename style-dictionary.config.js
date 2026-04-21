import StyleDictionary from "style-dictionary"

const sd = new StyleDictionary({
  source: ["./app/figma-variable.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "app/styles/",
      files: [
        {
          destination: "token.css",
          format: "css/variables",
          options: {
            selector: ":root",
          },
        },
      ],
    },
  },
})

await sd.buildAllPlatforms()
