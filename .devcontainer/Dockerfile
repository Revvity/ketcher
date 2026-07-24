FROM mcr.microsoft.com/devcontainers/typescript-node

RUN apt-get update \
    && apt-get install -y curl gnupg ca-certificates --no-install-recommends \
    && curl -s https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    # install google-chrome with dependencies
    && apt-get install -y google-chrome-stable git --no-install-recommends \
    && usermod -aG audio,video node \
    && fc-cache