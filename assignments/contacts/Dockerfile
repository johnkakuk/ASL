FROM node:20-bookworm-slim

WORKDIR /usr/src/app

# Install python to support jworkman stuff
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080
CMD ["npm", "start"]
