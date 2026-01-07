import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ShellSdkService from "../util/shell-sdk.service";

/**
 * @namespace ui5extension
 */
export default class View1 extends Controller {

    public onInit(): void {
        const shellSdkService = ShellSdkService.getInstance();
        const insideShell = shellSdkService.isInsideShell();
        
        const shellVersion = shellSdkService.getVersion();
        const model = new JSONModel({
            shellVersion: `FSM Shell Version: ${shellVersion}`,
            tokenHistory: `FSM Shell Version: ${shellVersion}`,
            errorMessage: ""
        });
        this.getView()?.setModel(model, "view");

        // Check if running inside FSM Shell
        if (!insideShell) {
            model.setProperty("/errorMessage", "This extension is supposed to be run inside the FSM Shell.");
            return;
        }

        // Subscribe to auth stream and display token accumulation
        const authTokenStream = shellSdkService.subscribeToAuth((auth) => {
            if (auth) {
                const tokenInfo = JSON.stringify(auth, null, 2);
                this.appendTokenToUI(tokenInfo, model);
            }
        });
    }

    private appendTokenToUI(token: string, model: JSONModel): void {
        const currentContent = model.getProperty("/tokenHistory") as string;
        const separator = currentContent ? "\n\n" + "=".repeat(50) + "\n\n" : "";
        const timestamp = new Date().toLocaleString();
        const newContent = currentContent + separator + 
            `${timestamp}\n${token}`;
        model.setProperty("/tokenHistory", newContent);
    }
}
