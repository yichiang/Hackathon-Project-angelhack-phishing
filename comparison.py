
from skimage.measure import structural_similarity as findSsimValue
import matplotlib.pyplot as plt
import numpy as np
import cv2
from PIL import Image
import socket
from resizeimage import resizeimage
import urllib.request

def findMseValue(imageA, imageB):
	# the 'Mean Squared Error' between the two images is the
	# sum of the squared difference between the two images;
	# NOTE: the two images must have the same dimension
    err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
    err /= float(imageA.shape[0] * imageA.shape[1])
	
	# return the MSE, the lower the error, the more "similar"
	# the two images are
    return err
 
def compare_images(imageA, imageB, title):
	# compute the mean squared error and structural similarity
	# index for the images
	mseValue = findMseValue(imageA, imageB)
	ssimValue = findSsimValue(imageA, imageB)
	return(mseValue,ssimValue)
	
def prepare_images(original_filepath, testing_filepath):
    original = cv2.imread(original_filepath)
    duplicate = cv2.imread(testing_filepath)
    
    im1 = Image.open(original_filepath)
    im2 = Image.open(testing_filepath)
    
    if(original.size > duplicate.size):
        resizeimage.resize_cover(im2, [im1.size[0],im1.size[1]], validate=False).save("duplicate.png")
        duplicate = cv2.imread("duplicate.png")
    elif (original.size < duplicate.size):
        resizeimage.resize_cover(im1, [im2.size[0],im2.size[1]], validate=False).save("original.png")
        original = cv2.imread("original.png")
    original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
    duplicate = cv2.cvtColor(duplicate, cv2.COLOR_BGR2GRAY)
    return(compare_images(original, duplicate, "Original vs. Duplicate"))

    def recordData(data, suspectImage):
    if(data[0]> suspectImage['mse']):
        suspectImage['mse'] = data[0]
    if(data[1]>suspectImage['ssim']):
        suspectImage['ssim'] = data[1]

        for masterImage in master_list :
    masterUrl = masterImage['filepath']
    for suspectImage in suspect_list :
        suspectUrl = suspectImage['filepath']
        data = prepare_images(masterUrl,suspectUrl)
        recordData(data, suspectImage)