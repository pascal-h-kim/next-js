FROM node:16.18.0
COPY . ./app
WORKDIR /app
# RUN npm install && npm build
# RUN npm run build
CMD ["npm", "run", "start"]
# CMD serve -s . -l 3005