import { notification } from "antd";

export const openSuccessNotification = (message, description) => {
  notification.success({
    message,
    description,
  });
};

export const openInfoNotification = (message, description) => {
  notification.info({
    message,
    description,
  });
};

export const openWarningNotification = (message, description) => {
  notification.warning({
    message,
    description,
  });
};

export const openErrorNotification = (message, description) => {
  notification.error({
    message,
    description,
  });
};
