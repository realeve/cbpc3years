function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = encodeURI(window.location.search)
    .substr(1)
    .match(reg);
  if (r !== null) return decodeURI(r[2]);
  return null;
}

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

function jsRight(sr, rightn) {
  return sr.substring(sr.length - rightn, sr.length);
}

function getNow(type = 1) {
  let date = new Date();

  let a = date.getFullYear();
  let b = jsRight("0" + (date.getMonth() + 1), 2);
  let c = jsRight("0" + date.getDate(), 2);
  let d = jsRight("0" + date.getHours(), 2);
  let e = jsRight("0" + date.getMinutes(), 2);
  let f = jsRight("0" + date.getSeconds(), 2);
  let output;
  switch (type) {
    case 0:
      output = a + "年" + b + "月" + c + "日";
      break;
    case 1:
      output = a + "-" + b + "-" + c + " " + d + ":" + e + ":" + f;
      break;
    case 2:
      output = a + "年" + b + "月" + c + "日" + d + "时" + e + "分" + f + "秒";
      break;
    case 3:
      output = a + "-" + b + "-" + c + " " + d + ":" + e;
      break;
    case 4:
      output = a + "年" + b + "月" + c + "日  " + d + "时" + e + "分";
      break;
    case 5:
      output = b + "/" + c + "/" + a;
      break;
    case 6:
      output = a + "-" + b + "-" + c;
      break;
    case 7:
      output = a + "-" + b;

      break;
    case 8:
      output = a + b + c;
      break;
  }
  return output;
}

function randomsort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}

function getRandomArr(len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr.sort(randomsort);
}

let randomArr = arr => {
  let rdmArr = getRandomArr(arr.length);
  return arr.map((item, i) => arr[rdmArr[i]]);
};

const handleErr = e => {
  const rec_time = getNow();
  let errName = "";
  switch (e.name) {
    case "ReferenceError":
      errName = "找不到对象";
      break;
    case "TypeError":
      errName = "错误地使用了类型或对象的方法";
      break;
    case "RangeError":
      errName = "使用内置对象的方法时，参数超范围";
      break;
    case "SyntaxError":
      errName = "语法错误";
      break;
    case "EvalError":
      errName = "错误地使用了Eval";
      break;
    case "URIError":
      errName = "URI错误";
      break;
    default:
      errName = "其它错误";
      break;
  }
  const errContent = String(e.stack)
    .replace(/\'/g, "\\'")
    .replace(/\n/g, "<br>");
  const err_desc = `【${errName}】${errContent}`;
  const err_url = window.location.href;
  return {
    rec_time,
    err_desc,
    err_url,
    device_platform: navigator.platform,
    device_user_agent: navigator.userAgent,
    device_app_version: navigator.appVersion
  };
};

export default {
  getUrlParam,
  getNow,
  isWeiXin,
  getRandomArr,
  randomArr,
  handleErr
};
