#!/usr/local/bin/python2
# -*- coding: utf-8 -*-

'''
install library from here -> https://github.com/Imgur/imgurpython
make sure this file has a right permission -> sudo chmod 755 imgur.py
'''

from imgurpython import ImgurClient
import cgi
import cgitb; cgitb.enable()
import json
import random

print 'Content-type: text/javascript; charset=utf-8\n\n'


client_id = 'b33a065b7450ff2'
client_secret = 'd4509405d194b66b2dbd96af17285e85dad87808'

client = ImgurClient(client_id, client_secret)

form = cgi.FieldStorage()

q = form.getfirst("query", "")
#q = 'dog'

items = client.gallery_search(q, advanced=None, sort='time', window='all', page=0)
index = random.randint(0, len(items)-1)

print  json.dumps({'url':items[index].link})

