/*global QUnit*/
import Controller from "ui5extension/controller/View1.controller";

QUnit.module("View1 Controller");

QUnit.test("I should test the View1 controller", function (assert: Assert) {
	const oAppController = new Controller("View1");
	oAppController.onInit();
	assert.ok(oAppController);
});