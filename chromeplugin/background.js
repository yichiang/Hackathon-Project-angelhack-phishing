

chrome.tabs.onCreated.addListener(function(tab) {
  if(tab.url == 'http://swordfishhackathon.s3-website.us-east-2.amazonaws.com/')
  {
    alert('We believe this url is unsafe and attempting to impersonate bankofamerica.com');
  }});
