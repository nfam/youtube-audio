import json
import os
import subprocess
from queue import Queue
from bottle import route, run, Bottle, request, static_file
from threading import Thread

class Item(object):
    __slots__ = ['url', 'quality']

app = Bottle()

@app.route('/')
def dl_queue_list():
    return static_file('index.html', root='./')

@app.route('/assets/:filename#.*#')
def server_static(filename):
    return static_file(filename, root='./assets')

@app.route('/q', method='GET')
def q_size():
    return { "success" : True, "size" : json.dumps(list(dl_q.queue)) }

@app.route('/q', method='POST')
def q_put():
    url = request.forms.get( "url" )
    quality = request.forms.get( "quality" )
    if "" != url and "" != quality:
        item = Item()
        item.url = url
        item.quality = quality
        dl_q.put(item)
        print("Added url " + url + " (quality: "+quality+") to the download queue")
        return { "success" : True, "url" : url, "quality": quality }
    else:
        return { "success" : False, "error" : "paramater url or quality are missing" }

def dl_worker():
    while not done:
        item = dl_q.get()
        download(item)
        dl_q.task_done()

def download(item):
    print("Starting download of " + item.url + " (quality: "+item.quality+")")
    quality = "--audio-quality="+item.quality
    command = ['/usr/local/bin/youtube-dl', '-o', '/downloads/%(title)s.%(ext)s', '-x', '--audio-format=mp3', quality, item.url]
    subprocess.call(command, shell=False)
    print("Finished downloading " + item.url)

dl_q = Queue();
done = False;
dl_thread = Thread(target=dl_worker)
dl_thread.start()

print("Started download thread")

app.run(host='0.0.0.0', port=8080, debug=False)
done = True
dl_thread.join()
