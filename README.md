# youtube-audio
![license][license-badge]

Web UI to download youtube videos and extract audio onto a server using [`youtube-dl`](https://github.com/rg3/youtube-dl).

![screenshot][1]

## How to use this image

### Run on host networking

This example uses host networking for simplicity. Also note the `-v` argument. This directory will be used to output the resulting videos

```shell
sudo docker run -d \
    --name youtube-audio \
    -p 8080:8080 \
    -v ~/downloads:/downloads \
    nfam/youtube-audio
```

#### HTML

Just navigate to `http://{{address}}:8080/` and enter the requested `{{url}}`.

## Implementation

The server uses [`bottle`](https://github.com/bottlepy/bottle) for the web framework and [`youtube-dl`](https://github.com/rg3/youtube-dl) to handle the downloading. For better or worse, the calls to `youtube-dl` are made through the shell rather then through the python API.

[1]: youtube-audio.png

[license-badge]: https://img.shields.io/github/license/nfam/simex.tester.svg