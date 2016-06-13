# Inherit from node stack, app was developed with 4.4.3 but we should test using the latest engine
FROM node:4.4.3

# Download app code
RUN git clone https://github.com/ryanjamesmcgill/yourtime.git /home/yourtime

# install packages
WORKDIR /home/yourtime
RUN npm install

# production build application
RUN npm run build

# our app runs on port 3000
EXPOSE 3000

# start app command
CMD [ "npm", "run", "start:prod" ]