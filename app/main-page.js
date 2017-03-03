var frames = require("ui/frame");
var redditAppViewModel = require("./reddit-app-view-model");
var appViewModel = new redditAppViewModel.AppViewModel();

var perfMon = require("nativescript-performance-monitor");
var color = require("color");

var performanceMonitor = new perfMon.PerformanceMonitor();

performanceMonitor.start({
  textColor: new color.Color("white"),
  backgroundColor: new color.Color("black"),
  borderColor: new color.Color("black"),
  hide: false,
  onSample: function (sample) {
    console.log("FPS: " + sample.fps);
    if (sample.cpu) { // iOS only
      console.log("CPU %: " + sample.cpu);
    }
  }
});

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = appViewModel;
    if (frames.topmost().android) {
        frames.topmost().android.cachePagesOnNavigate = true;
    }
}
exports.pageLoaded = pageLoaded;
function listViewItemTap(args) {
    frames.topmost().navigate({
        moduleName: "details-page",
        context: appViewModel.redditItems.getItem(args.index)
    });
}
exports.listViewItemTap = listViewItemTap;
function listViewLoadMoreItems(args) {
    appViewModel.redditItems.length += appViewModel.redditItems.loadSize;
}
exports.listViewLoadMoreItems = listViewLoadMoreItems;
