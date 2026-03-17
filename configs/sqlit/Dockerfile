FROM python:3.13-alpine

RUN pip install --no-cache-dir sqlit-tui

# Mount point for user's current directory
VOLUME ["/data"]
WORKDIR /data

ENTRYPOINT ["sqlit"]
