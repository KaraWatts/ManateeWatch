# Build React static files
FROM node:alpine as builder

# Set working Directory
WORKDIR /manateewatch/frontend/manatee-watch

ENV PATH /manateewatch/frontend/manatee-watch/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY ./frontend/manatee-watch/package.json ./frontend/manatee-watch/package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend files
COPY . .


# Expose port 5173 for React development server
EXPOSE 3000

CMD [ "npm", "start" ]
