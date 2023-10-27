# Development stage
FROM node:16-alpine AS base
WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to take advantage of Docker layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install


# Development
FROM base AS development
COPY . .
CMD ["npm" , "run" , "start:development"]

# Production
FROM base AS production
COPY . .
CMD ["npm" , "run" , "start:production"]