# 1. Use official Node.js LTS image (Alpine for smaller size)
FROM node:18-alpine

# 2. Set working directory inside container
WORKDIR /usr/src/app

# 3. Copy package manifests and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 4. Copy application source
COPY . .

# 5. Expose default port
EXPOSE 3000

# 6. Define start command
CMD [ "node", "app.js" ]

