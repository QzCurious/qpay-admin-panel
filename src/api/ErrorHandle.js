export const throwErr = err => {
  let message;
  switch (err.status) {
    case 400:
      message = "請求錯誤";
      break;
    case 401:
      message = "未授權，請登錄";
      break;
    case 403:
      message = "拒絕訪問";
      break;
    case 404:
      message = "找不到該頁面";
      break;
    case 408:
      message = "請求超時";
      break;
    case 500:
      message = "服務器內部錯誤";
      break;
    case 501:
      message = "服務未實現";
      break;
    case 502:
      message = "網關錯誤";
      break;
    case 503:
      message = "服務不可用";
      break;
    case 504:
      message = "網關超時";
      break;
    case 505:
      message = "HTTP版本不受支持";
      break;
    default:
      message = `連接錯誤: ${err.Response.status}`;
  }
  return message;
};
