import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import ShellSdkService from "./util/shell-sdk.service";

/**
 * @namespace ui5extension
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
	};

	public init() : void {
        const shellSdk = ShellSdkService.getInstance();
		// call the base component's init function
		super.init();

        // Init shell and persist instance
        console.log(`running ShellSdk VERSION: ${shellSdk.getVersion()}`);

        // set the device model
        this.setModel(createDeviceModel(), "device");

        // enable routing
        const router = this.getRouter();
        if (router) {
            router.initialize();
        }
	}
}