FROM node:14.7-slim
RUN mkdir -p usr/src/react-form
WORKDIR /usr/src/react-form
COPY . .
RUN npm install -g serve
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]