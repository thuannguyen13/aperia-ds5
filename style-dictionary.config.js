import StyleDictionary from "style-dictionary"

const sd = new StyleDictionary({
  source: ["./styles/figma-variable.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "styles/",
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
