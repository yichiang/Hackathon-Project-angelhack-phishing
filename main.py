__author__      = "Steven Cozart, Zach Turk"

import requests
from fuzzywuzzy import fuzz
from bs4 import BeautifulSoup

# stores imgs on local disk
def save_image_from_url(url, dest_path):
    r = requests.get(url, allow_redirects=True)
    open(dest_path+'/'+url.split('/')[-1], 'wb').write(r.content)


# return dict of local of known sites
def get_good_text(urls):
    dictUrls = {}
    for url in urls:
        page = requests.get(url)
        dictUrls[url] = BeautifulSoup(page.content, 'html.parser')
    return dictUrls


# return dict of local of known imgs @parm dict of key = url value = soup
def get_imgs(all_ulrs):
    shared_list_of_dicts = []
    for url in all_ulrs:
        soup = all_ulrs[url]
        for imgtag in soup.find_all('img'):
            image_entry = {}
            image_entry['url'] = imgtag["src"],
            image_entry['filepth'] = "images/" + imgtag["src"],
            image_entry['ssim'] = '',
            image_entry['mse'] = '',
            save_image_from_url(imgtag["src"], "images")  # need destitnation
            shared_list_of_dicts.append(image_entry)
    return shared_list_of_dicts


def main():
    print("Welcome to swordPhish scraper")
    urls = {"https://www.bankofamerica.com/"}
    all_text = get_good_text(urls) #key = url value = text
    all_imgs = get_imgs(all_text) #key = url value = list of img destination

    while True:
        print("Enter url:")
        user_input = input().strip()
        page = requests.get(user_input)
        soup = BeautifulSoup(page.content, 'html.parser')
        url = user_input

        #Compare all images
        # todo compare all imgs to
        dict[url] = soup
        bad_img = get_imgs(dict)


        #Compare all text
        site_text = soup.get_text()

        max_ratio = -1
        url = "none"
        #check text vs other sites
        for  key in all_text :
            ratio = fuzz.ratio(site_text , all_text[key].get_text())
            if ratio > max_ratio :
                max_ratio = ratio
                url = key

        text_match = (url, max_ratio)


if __name__ == "__main__":
    main()