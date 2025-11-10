sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 * @param {typeof sap.m.MessageToast} MessageToast
 */
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.training.exer1gaabucayanactivity6.controller.MainView", {
         onInit: function () {
            // initialization if needed
        },

       // ✅ Add to Cart Button
        onAddItem: function () {
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var sMsg = oTextBundle.getText("addButtonMsg");
            // this.fnDisplayMsg(sMsg);
                        // create dialog lazily
                if (!this.oDialog) {
                    // By using loadFragment, we are adding the fragment as a dependent to the View
                    // By doing so, we can use the functions inside the view's controller
                    this.oDialog = this.loadFragment({
                        name: "com.training.exer1gaabucayanactivity6.fragment.ProductDialog"
                    });
                 
                }
                this.oDialog.then(function(oDialog) {
                    oDialog.open();
                });
           
               
            },
            onCloseDialog: function (){
                this.getView().byId("idProductDialog").close();
           
        },
 
        fnDisplayMsg: function (sMsg) {
            MessageToast.show(sMsg);
        },
 
        // ✅ Change event for Mode of Payment

        onChangeMOP: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
            var oMobileLabel = this.getView().byId("idLblPhone");
            var oMobileInput = this.getView().byId("idInputPhone");
            var oCCLabel = this.getView().byId("idLblCC");
            var oCCInput = this.getView().byId("idInputCC"); // ✅ corrected ID

            // Hide all optional fields first
            oMobileLabel.setVisible(false);
            oMobileInput.setVisible(false);
            oCCLabel.setVisible(false);
            oCCInput.setVisible(false);

            // Show only the relevant field
            if (sSelectedKey === "GCASH") {
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
            } else if (sSelectedKey === "CC") {
                oCCLabel.setVisible(true);
                oCCInput.setVisible(true);
            }

            // Show selected payment mode in MessageToast
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("selectedPaymentMsg", [sSelectedKey]);
            MessageToast.show(sMsg);
        },

        // ✅ Check Out button logic
        // onPressCheckout: function () {
            // var oInputFNameValue = this.getView().byId("idInpFName").getValue();
            // var oInputLNameValue = this.getView().byId("idInpLName").getValue();
 
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
 
            // // Check if both fields are blank
            // if (oInputFNameValue === "" || oInputLNameValue === "") {
            //     var sMsg = oTextBundle.getText("requiredFieldsMsg");
            //     MessageToast.show(sMsg);
            // } else {
            //     MessageToast.show("Checkout successful!");
            // }
         onPressCheckout: function () {
                var oInputFName = this.getView().byId("idInpFName");
                var oInputLName = this.getView().byId("idInpLName");
                var oInputFNameValue = oInputFName.getValue();
                var oInputLNameValue = oInputLName.getValue();
                var oRouter = this.getOwnerComponent().getRouter();
 
                // Check if first name and last name is blank
                if (oInputFNameValue === "" || oInputLNameValue === ""){
                   
// set value state to Error
                    oInputFName.setValueState("Error");
                    oInputLName.setValueState("Error");
                } else {
                    oInputFName.setValueState("None");
                    oInputLName.setValueState("None");
 
                    //Navigate to review page passing first
                    oRouter.navTo("RouteReviewPage", {
                        firstName: oInputFNameValue
                    });
 
                }
            },
       
 
    });
});
