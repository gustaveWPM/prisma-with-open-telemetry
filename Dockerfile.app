FROM ubuntu:24.04

ENV SHELL /bin/bash


RUN apt-get update && \
    apt-get install -y \
    make git openssl curl unzip coreutils cron findutils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


RUN useradd -ms /bin/sh -u 1001 app


RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs


RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.20"


WORKDIR /app

COPY --chown=app:app . .

RUN touch /var/log/cron.log \
    && chown app:app /var/log/cron.log \
    && chmod 644 /var/log/cron.log

ENV PATH="/root/.bun/bin:${PATH}"

CMD ["make", "docker-app-entrypoint"]
