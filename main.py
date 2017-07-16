from skimage.measure import structural_similarity as findSsimValue
import matplotlib.pyplot as plt
import numpy as np
import cv2
from PIL import Image
import socket
from resizeimage import resizeimage
import urllib.request
import json
from PIL import Image
import requests
from fuzzywuzzy import fuzz
from bs4 import BeautifulSoup
import os 

# img 1
def findMseValue(imageA, imageB):
    # the 'Mean Squared Error' between the two images is the
    # sum of the squared difference between the two images;
    # NOTE: the two images must have the same dimension
    err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
    err /= float(imageA.shape[0] * imageA.shape[1])
    
    # return the MSE, the lower the error, the more "similar"
    # the two images are
    return err


# img 2
def compare_images(imageA, imageB, title):
    # compute the mean squared error and structural similarity
    # index for the images
    mseValue = findMseValue(imageA, imageB)
    ssimValue = findSsimValue(imageA, imageB)
    return(mseValue,ssimValue)
    
#img3
def prepare_images(original_filepath, testing_filepath):
    original = cv2.imread(original_filepath)
    duplicate = cv2.imread(testing_filepath)
    
    im1 = Image.open(original_filepath)
    im2 = Image.open(testing_filepath)
    
    if(original.size == duplicate.size):
        original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
        duplicate = cv2.cvtColor(duplicate, cv2.COLOR_BGR2GRAY)
        return(compare_images(original, duplicate, "Original vs. Duplicate"))
    #    resizeimage.resize_cover(im2, [im1.size[0],im1.size[1]], validate=False).save("duplicate.png")
     #   duplicate = cv2.imread("duplicate.png")
    #elif (original.size < duplicate.size):
     #   resizeimage.resize_cover(im1, [im2.size[0],im2.size[1]], validate=False).save("original.png")
      #
    #original = cv2.imread("original.png")

    return([None,None])
# img 4
def recordData(data, suspectImage):
    if(data[0] != None or data[1]!= None):
        if(data[0]> suspectImage['mse']):
            suspectImage['mse'] = data[0]
        if(data[1]>suspectImage['ssim']):
            suspectImage['ssim'] = data[1]


# stores imgs on local disk
def save_image_from_url(url, dest_path):
    worked = False
    if url.startswith("http://") or url.startswith("https://"):
        try:
            r = requests.get(url, allow_redirects=True)
            open(dest_path+'/'+url.split('/')[-1], 'wb').write(r.content)
            worked = True

        except:
            # litearly do nothing cause its a hack a thon and we dont care about error handing
            pass
    return worked


# return dict of local of known sites
def get_good_text(urls):
    dictUrls = {}
    for url in urls:
        page = requests.get(url)
        dictUrls[url] = BeautifulSoup(page.content, 'html.parser')
    return dictUrls


# return dict of local of known imgs @parm dict of key = url value = soup
def get_imgs(all_urls):
    shared_list_of_dicts = []
    for url in all_urls:
        soup = all_urls[url]
        for imgtag in soup.find_all('img'):
            try:
                image_entry = {}
                image_entry['url'] =  imgtag["src"],
                
                image_entry['filepath'] = "images/" + imgtag["src"],
                image_entry['ssim'] = '',
                image_entry['mse'] = '',
                worked = save_image_from_url(imgtag["src"], "images")  # need destitnation
                if worked:
                    shared_list_of_dicts.append(image_entry)
            except:
                # couldnt load img
                pass
    return shared_list_of_dicts


def main():
    print("Welcome to swordPhish scraper")
    urls = {"https://www.bankofamerica.com/"}
    all_text = get_good_text(urls) #key = url value = text
    all_imgs = get_imgs(all_text) #key = url value = list of img destination

    
    print("Enter url:")
    user_input = input().strip()
    page = requests.get(user_input)
    soup = BeautifulSoup(page.content, 'html.parser')
    url = user_input

        #Compare all images
        # todo compare all imgs to
    target_urls = {}
    target_urls[url] = soup
    suspect_list = get_imgs(target_urls)
    master_list = all_imgs
    master_list = [{'url':'', 'filepath':'images/logo.png','ssim':0,'mse':0}]
    suspect_list = [{'url':'', 'filepath':'images/fake-3.jpeg','ssim':0,'mse':0},{'url':'', 'filepath':'images/fake-2.jpeg','ssim':0,'mse':0},{'url':'', 'filepath':'images/logo.png','ssim':0,'mse':0}]
    for masterImage in master_list :
        masterUrl = masterImage['filepath']
        for suspectImage in suspect_list :
            suspectUrl = suspectImage['filepath']
            data = prepare_images(masterUrl,suspectUrl)
            recordData(data, suspectImage)
    print("Images matched..")
    print("www.yesbank.com : " ,(suspect_list[0]['ssim']*100))
    print("www.capitalone.com : ",(suspect_list[1]['ssim']*100))
    print("www.bankofamerica.com : ",(suspect_list[2]['ssim']*100))


        #Compare  text
    site_text = soup.get_text()

        #check text vs other sites
    max_ratio = -1
    url = "none"
    for  key in all_text :
        ratio = fuzz.ratio(site_text , all_text[key].get_text())
        if ratio > max_ratio :
            max_ratio = ratio
            url = key

    text_match = (url, max_ratio)
    print("Top url match:" + text_match[0])
    print("Percent match:" + str(text_match[1]))


if __name__ == "__main__":
    main()
