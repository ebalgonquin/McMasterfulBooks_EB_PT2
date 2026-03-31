FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (devDependencies required for tsx + tsoa)
RUN npm install

# Copy the rest of the project
COPY . .

# Build TSOA routes + swagger
RUN npx tsoa spec-and-routes

# Expose adapter port
EXPOSE 3000

# Start the server using tsx
CMD ["npx", "tsx", "index.ts"]