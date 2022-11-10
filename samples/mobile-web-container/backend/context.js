var mobileAppContext = undefined;

function storeContext(context) {
  mobileAppContext = context;
}

function getContext() {
  return mobileAppContext;
}

exports.storeContext = storeContext;
exports.getContext = getContext;