const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        "appId": "com.muke.noteP",
        "productName":"noteP",
        "directories": {
          "output": "build",
          "buildResources": "dist"
        },
        "win": {
          "target": [
            "nsis",
            "msi"
          ],
          "icon": "build/icons/icon.ico"
        },
        "nsis": {
          "oneClick": false,
          "language": "2052",
          "perMachine": true,
          "createDesktopShortcut":true,
          "createStartMenuShortcut":true,
          "allowToChangeInstallationDirectory": true,
        },
        "msi":{
          "oneClick": false,
          "runAfterFinish": true,
          "createDesktopShortcut":true,
          "createStartMenuShortcut":true,
          "menuCategory":true
        }
      }
    }
  }
})
