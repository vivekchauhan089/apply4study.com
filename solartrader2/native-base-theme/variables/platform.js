import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && (deviceHeight === 812 || deviceWidth === 812);

export default {
  platformStyle,
  platform,

  //Accordion
  headerStyle: "#edebed",
  iconStyle: "#bcc6d9",
  contentStyle: "#f5f4f5",
  expandedIconStyle: "#bcc6d9",
  accordionBorderColor: "#d3d3d3",

  // Android
  androidRipple: true,
  androidRippleColor: "rgba(256, 256, 256, 0.3)",
  androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
  btnUppercaseAndroidText: true,

  // Badge
  badgeBg: "#ED1727",
  badgeColor: "#bcc6d9",
  badgePadding: platform === "ios" ? 3 : 0,

  // Button
  btnFontFamily: platform === "ios" ? "System" : "Roboto_medium",
  btnDisabledBg: "#b5b5b5",
  buttonPadding: 6,
  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return platform === "ios" ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: "#bcc6d9",
  cardBorderColor: "#ccc",
  cardBorderRadius: 2,
  cardItemPadding: platform === "ios" ? 10 : 12,

  // CheckBox
  CheckboxRadius: platform === "ios" ? 13 : 0,
  CheckboxBorderWidth: platform === "ios" ? 1 : 2,
  CheckboxPaddingLeft: platform === "ios" ? 4 : 2,
  CheckboxPaddingBottom: platform === "ios" ? 0 : 5,
  CheckboxIconSize: platform === "ios" ? 21 : 16,
  CheckboxIconMarginTop: platform === "ios" ? undefined : 1,
  CheckboxFontSize: platform === "ios" ? 23 / 0.9 : 17,
  checkboxBgColor: "#039BE5",
  checkboxSize: 20,
  checkboxTickColor: "#bcc6d9",

  // Color
  brandPrimary: platform === "ios" ? "#007aff" : "#131c2a",
  brandInfo: "#62B1F6",
  brandSuccess: "#5cb85c",
  brandDanger: "#d9534f",
  brandWarning: "#f0ad4e",
  brandDark: "#bcc6d9",
  brandLight: "#bcc6d9",

  //Container
  containerBgColor: "#bcc6d9",

  //Date Picker
  datePickerTextColor: "#bcc6d9",
  datePickerBg: "transparent",

  // Font
  DefaultFontSize: 16,
  fontFamily: platform === "ios" ? "System" : "Roboto",
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: 55,
  footerDefaultBg: platform === "ios" ? "#131c2a" : "#131c2a",
  footerPaddingBottom: 0,

  // FooterTab
  tabBarTextColor: platform === "ios" ? "#6b6b6b" : "#b3c7f9",
  tabBarTextSize: platform === "ios" ? 14 : 11,
  activeTab: platform === "ios" ? "#007aff" : "#bcc6d9",
  sTabBarActiveTextColor: "#007aff",
  tabBarActiveTextColor: platform === "ios" ? "#007aff" : "#bcc6d9",
  tabActiveBgColor: platform === "ios" ? "#cde1f9" : "#131c2a",

  // Header
  toolbarBtnColor: platform === "ios" ? "#6d788c" : "#6d788c",
  toolbarDefaultBg: platform === "ios" ? "#182129" : "#182129",
  toolbarHeight: platform === "ios" ? 64 : 56,
  toolbarSearchIconSize: platform === "ios" ? 20 : 23,
  toolbarInputColor: platform === "ios" ? "#6d788c" : "#bcc6d9",
  searchBarHeight: platform === "ios" ? 30 : 40,
  searchBarInputHeight: platform === "ios" ? 30 : 50,
  toolbarBtnTextColor: platform === "ios" ? "#007aff" : "#bcc6d9",
  toolbarDefaultBorder: platform === "ios" ? "#131c2a" : "#131c2a",
  iosStatusbar: platform === "ios" ? "dark-content" : "light-content",
  get statusBarColor() {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex();
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex();
  },

  // Icon
  iconFamily: "Ionicons",
  iconFontSize: platform === "ios" ? 30 : 28,
  iconHeaderSize: platform === "ios" ? 33 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: "#232f3a",
  inputSuccessBorderColor: "#2b8339",
  inputErrorBorderColor: "#ed2f2f",
  inputHeightBase: 50,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return "#6d788c";
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: platform === "ios" ? 20 : 24,
  listItemSelected: platform === "ios" ? "#007aff" : "#131c2a",

  // List
  listBg: "transparent",
  listBorderColor: "#465168",
  listDividerBg: "#465168",
  listBtnUnderlayColor: "#DDD",
  listItemPadding: platform === "ios" ? 14 : 16,
  listNoteColor: "#808080",
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: "#E4202D",
  inverseProgressColor: "#1A191B",

  // Radio Button
  radioBtnSize: platform === "ios" ? 25 : 23,
  radioSelectedColorAndroid: "#131c2a",
  radioBtnLineHeight: platform === "ios" ? 29 : 24,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  segmentBackgroundColor: platform === "ios" ? "#131c2a" : "#131c2a",
  segmentActiveBackgroundColor: platform === "ios" ? "#007aff" : "#bcc6d9",
  segmentTextColor: platform === "ios" ? "#007aff" : "#bcc6d9",
  segmentActiveTextColor: platform === "ios" ? "#bcc6d9" : "#131c2a",
  segmentBorderColor: platform === "ios" ? "#007aff" : "#bcc6d9",
  segmentBorderColorMain: platform === "ios" ? "#a7a6ab" : "#131c2a",

  // Spinner
  defaultSpinnerColor: "#45D56E",
  inverseSpinnerColor: "#1A191B",

  // Tab
  tabDefaultBg: platform === "ios" ? "#131c2a" : "#131c2a",
  topTabBarTextColor: platform === "ios" ? "#6b6b6b" : "#b3c7f9",
  topTabBarActiveTextColor: platform === "ios" ? "#007aff" : "#bcc6d9",
  topTabBarBorderColor: platform === "ios" ? "#a7a6ab" : "#bcc6d9",
  topTabBarActiveBorderColor: platform === "ios" ? "#007aff" : "#bcc6d9",

  // Tabs
  tabBgColor: "#131c2a",
  tabFontSize: 15,

  // Text
  textColor: "#bcc6d9",
  inverseTextColor: "#bcc6d9",
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: platform === "ios" ? "System" : "Roboto_medium",
  titleFontSize: platform === "ios" ? 17 : 19,
  subTitleFontSize: platform === "ios" ? 11 : 14,
  subtitleColor: platform === "ios" ? "#8e8e93" : "#bcc6d9",
  titleFontColor: platform === "ios" ? "#bcc6d9" : "#bcc6d9",

  // Other
  borderRadiusBase: platform === "ios" ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: "#414142",
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,

  //iPhoneX SafeArea
  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21
    }
  }
};
