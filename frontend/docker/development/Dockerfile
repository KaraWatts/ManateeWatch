# Build React static files
FROM node:alpine as builder

# Set working Directory
WORKDIR /manateewatch/frontend

ENV PATH /manateewatch/frontend/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend files
COPY ./frontend /manateewatch/frontend


# Expose port 5173 for React development server
EXPOSE 3000

CMD [ "npm", "start" ]
