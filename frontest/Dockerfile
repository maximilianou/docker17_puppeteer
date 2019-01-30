FROM alekzonder/puppeteer
# set working directory
#RUN mkdir /app
WORKDIR /app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /app/package.json
COPY test /app/test
RUN npm install
# start app
CMD ["npm", "run", "test"]
