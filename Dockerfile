FROM python:3-alpine
COPY . /app
WORKDIR /app

RUN \
  apk add --no-cache ffmpeg && \
  pip install -r requirements.txt && \
  rm -rf /var/lib/apt/lists/*

EXPOSE 8080
VOLUME ["/downloads"]

CMD [ "python", "-u", "youtube-dl-server.py" ]
