interface Config{
    localStoragePath:string;
    windowsThemesPath:string;
}

const config: Config = {
    localStoragePath:'./images',
    windowsThemesPath:'C:/Users/41991/AppData/Local/Microsoft/Windows/Themes/custom/DesktopBackground',
}

const savePath:string = config.localStoragePath;  // 当前选择图片直接保存在我的windows自定义主题下

export default savePath;