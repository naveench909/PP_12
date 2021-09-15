// a. Name of Playlist,view
// b. Total No of videos : 792
// c. actual No of videos :783
// d. Total length of playlist : 12 hours, 9 minutes, 12 seconds
// At 1.25x : 9 hours, 43 minutes, 21 seconds

// At 1.50x : 8 hours, 6 minutes, 8 seconds
// At 1.75x : 6 hours, 56 minutes, 41 seconds
// At 2.00x : 6 hours, 4 minutes, 36 seconds
// Average length of video : 29 minutes, 10 seconds

// e. console.table of video number,name,time

// Current Task : name of playlist ,views,total videos,

const puppeteer = require("puppeteer");
const fs = require("fs");
let path = require("path");
let page;
(async function fn() {
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  page = await browser.newPage();
  await page.goto(
    "https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq"
  );

  //Playlist Title
  await page.waitForSelector("h1[id=title]");

  let playlistNameContainer = await page.$("h1[id=title]");

  let playlistName = await page.evaluate(function cb(videosAndViewsContainer) {
    return videosAndViewsContainer.textContent;
  }, playlistNameContainer);
  console.log("Playlist Name : ", playlistName);

  // Total Videos
  await page.waitForSelector("[id=stats] span[dir=auto]");

  let videosAndViewsContainer = await page.$("[id=stats] span[dir=auto]");

  let TotalVideos = await page.evaluate(function cb(videosAndViewsContainer) {
    return videosAndViewsContainer.textContent;
  }, videosAndViewsContainer);
  console.log("Total Videos : ", TotalVideos);

  // Total Views
  await page.waitForSelector(
    ".style-scope.ytd-playlist-sidebar-primary-info-renderer"
  );

  let getStatList = await page.$$(
    ".style-scope.ytd-playlist-sidebar-primary-info-renderer"
  );

  let TotalViews = await page.evaluate(function cb(getStatList) {
    return getStatList.textContent;
  }, getStatList[6]);
  console.log("Total Views : ", TotalViews);

  // getting all videos and print it in form of table
  // 1. getting first 100 videos

  // waiting for all 100 video to load
  /*

  await page.waitForSelector("#index-container");

  let videoNumber = await page.$$("[id=index]");
  let videoName = await page.$$("a[id=video-title]");
  let videoLength = await page.$$("span[id=text]");

  // console.log(videoNumber.length, videoName.length, videoLength.length);
  let videoArr = [];
  videoArr = await getdata(videoLength, videoName, videoNumber, videoArr);
  console.table(videoArr);

  */

  // getting full playlist
  await page.waitForSelector("#index-container");
  let videoArr = [];
  let totalVideosTillNow = 1;
  // do {
  //   console.log("hi");
  //   let videoNumber = await page.$$("[id=index]");
  //   let videoName = await page.$$("a[id=video-title]");
  //   let videoLength = await page.$$("span[id=text]");
  //   totalVideosTillNow = videoNumber;
  //   videoArr = await getdata(videoLength, videoName, videoNumber, videoArr);
  //   page.evaluate((_) => {
  //     window.scrollBy(0, 20000);
  //   });
  //   // await page.waitForNavigation({
  //   //   waitUntil: "networkidle2",
  //   // });
  //   // await page.waitForSelector;
  // } while (videoArr.length < totalVideosTillNow);

  let loopCount = Math.floor(TotalVideos / 100);
  for (let i = 0; i <= loopCount; i++) {
    // console.log("hi");
    let videoNumber = await page.$$("[id=index]");
    let videoName = await page.$$("a[id=video-title]");
    let videoLength = await page.$$("span[id=text]");
    totalVideosTillNow = videoNumber;
    videoArr = await getdata(videoLength, videoName, videoNumber, videoArr);
    page.evaluate((_) => {
      window.scrollBy(0, 20000);
    });
  }

  console.log(videoArr.length);
  for (let i = 0; i < 200; i++) {
    console.log(videoArr[i]);
  }

  fs.writeFileSync("playlist.txt", videoArr);
  console.log("Task Complete");
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function getdata(videoLength, videoName, videoNumber, videoArr) {
  for (let i = 0; i <= 99; i++) {
    let number = await page.evaluate(function (el) {
      return el.textContent.trim();
    }, videoNumber[i]);

    let vName = await page.evaluate(function (el) {
      return el.textContent.trim();
    }, videoName[i]);

    let length = await page.evaluate(function (el) {
      return el.textContent.trim();
    }, videoLength[i]);
    // console.log(number, vName, length);
    let obj = { number, vName, length };
    videoArr.push(obj);
  }
  return videoArr;
}

async function getContent(selector) {
  await page.waitForSelector(selector);
  let playlistNameContainer = await page.$(selector);

  let playlistName = await page.evaluate(function cb(videosAndViewsContainer) {
    return videosAndViewsContainer.textContent;
  }, playlistNameContainer);
  console.log(playlistName);
  // return playlistName;
}
