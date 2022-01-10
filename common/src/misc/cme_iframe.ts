import { I18nService } from "../abstractions/i18n.service";
import { IFrameComponent } from "./iframe_component";

export class CMEIFrame extends IFrameComponent {
  constructor(
    win: Window,
    webVaultUrl: string,
    successCallback: (message: string) => any,
    errorCallback: (message: string) => any,
    infoCallback: (message: string) => any
  ) {
    super(
      win,
      webVaultUrl,
      "cme-connector.html",
      "cme_iframe",
      successCallback,
      errorCallback,
      (message: string) => {
        const parsedMessage = JSON.parse(message);
        if (typeof parsedMessage !== "string") {
          this.iframe.height = parsedMessage.height.toString();
          this.iframe.width = parsedMessage.width.toString();
        } else {
          infoCallback(parsedMessage);
        }
      }
    );
  }

  init(token: string, url: string): void {
    super.initComponent(
      this.createParams(
        {
          url: url,
          token: token,
          operation: "get",
        },
        1
      )
    );
  }
}