FROM sitespeedio/node:ubuntu-22.04-nodejs-18.14.2

# fix locales
RUN apt-get update \
    && apt-get install -y --no-install-recommends locales \
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
 
ENV LANG en_US.utf8
 
# install blobfuse
RUN apt-get update \
    && apt-get install -y wget apt-utils \
    && wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && apt-get remove -y wget \
    && apt-get update \
    && apt-get install -y --no-install-recommends fuse blobfuse libcurl3-gnutls libgnutls30 \
    && rm -rf /var/lib/apt/lists/*

COPY devop/mount-blobfuse.sh /
RUN chmod 755 /mount-blobfuse.sh

WORKDIR /api

COPY api/package*.json /api/

RUN npm install

COPY api /api/

ENTRYPOINT ["/bin/bash","/mount-blobfuse.sh"]

CMD npm start