import UIkit from 'uikit';

export const notification = ({
    expectedCode = 200,
    code = null,
    message = 'Success',
    timeout = 2000,
    pos = 'top-right',
    type = 'success',
}: {
    expectedCode: number,
    code: number | null,
    message: string,
    timeout: number,
    pos: "top-right" | "top-left" | "top-center" | "bottom-left" | "bottom-center" | "bottom-right" | undefined,
    type: "success" | "primary" | "warning" | "danger" | undefined,
}) => {
    UIkit.notification({
        message: (code === expectedCode)
            ? message
            : 'Oops, something went wrong!',
        status: (code === expectedCode) ? type : 'danger',
        pos,
        timeout,
    });
    return null;
};
