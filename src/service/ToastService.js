const ToastService = {
  init: toastService => {
    ToastService.add = toastService.add;
    ToastService.removeGroup = toastService.removeGroup;
    ToastService.removeAllGroup = toastService.removeAllGroup;
  }
};

export default ToastService;
