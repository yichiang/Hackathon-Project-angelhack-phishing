

chrome.tabs.onCreated.addListener(function(tab) {
  if(tab.url.indexOf('swordfishhackathon.s3-website.us-east-2.amazonaws.com/')> -1)
  {
    alert('We believe this url is unsafe and attempting to impersonate bankofamerica.com');
  }});



  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  //   if(tab.url == 'http://swordfishhackathon.s3-website.us-east-2.amazonaws.com/')
  //   {
  //     alert('We believe this url is unsafe and attempting to impersonate bankofamerica.com');
  //   }
  // });
