function fontSize(val,initWidth=1920){

  let nowClientWidth = document.documentElement.clientWidth;
  return val * (nowClientWidth/initWidth);
}
export default fontSize;
