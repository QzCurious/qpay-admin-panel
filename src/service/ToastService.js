const ToastService = {
  init: toastService => {
    ToastService.add = ({ life, ...args }) =>
      toastService.add({ life: 3000, ...args });
    ToastService.removeGroup = toastService.removeGroup;
    ToastService.removeAllGroup = toastService.removeAllGroup;

    ToastService.success = args =>
      toastService.add({ ...args, severity: "success" });
    ToastService.info = args =>
      toastService.add({ ...args, severity: "info" });
    ToastService.warn = args =>
      toastService.add({ ...args, severity: "warn" });
    ToastService.error = args =>
      toastService.add({ ...args, severity: "error" });
  }
};

export default ToastService;
