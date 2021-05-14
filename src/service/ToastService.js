const ToastService = {
  init: toastService => {
    ToastService.add = ({ ...args }) =>
      toastService.add({ life: 3000, ...args });
    ToastService.removeGroup = toastService.removeGroup;
    ToastService.removeAllGroup = toastService.removeAllGroup;

    ToastService.success = args =>
      ToastService.add({ ...args, severity: "success" });
    ToastService.info = args =>
      ToastService.add({ ...args, severity: "info" });
    ToastService.warn = args =>
      ToastService.add({ ...args, severity: "warn" });
    ToastService.error = args =>
      ToastService.add({ ...args, severity: "error" });
  }
};

export default ToastService;
