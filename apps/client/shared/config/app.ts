interface AppConfig {
  /**
   * the english name of the application
   * @default 'YouXiaoTong''
   */
  APP_NAME_ENGLISH: string;

  /**
   * the chinese name of the application
   * @default '优校通''
   */
  APP_NAME_CHINESE: string;

  /**
   * the theme pink color of the application
   * @default #fb86a7
   */
  APP_THEME_PINK_COLOR:string

  /** 
   * the theme blue color of the application
   * @default #00a1d6
  */
 APP_THEME_BLUE_COLOR:string
}

const appConfig = Object.freeze<Readonly<AppConfig>>({
  APP_NAME_ENGLISH: 'YouXiaoTong',
  APP_NAME_CHINESE:"优校通",
  APP_THEME_PINK_COLOR:"#fb86a7",
  APP_THEME_BLUE_COLOR:"#00a1d6"
});

export { appConfig, type AppConfig };
