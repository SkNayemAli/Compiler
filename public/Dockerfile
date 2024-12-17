# Use Node.js base image
FROM node:22.12.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to /app
COPY . .

# Set environment variable and expose port
ENV PORT 8000
EXPOSE 8000

# Command to start the app
CMD ["node", "Api.js"]
