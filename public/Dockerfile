FROM node:22.11.0
WORKDIR /app
COPY . /app
RUN npm install
ENV PORT 8000
EXPOSE 8000
CMD ["node", "Api.js"]