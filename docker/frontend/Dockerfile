FROM node:20 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Remove the default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Angular build output to the Nginx HTML directory
COPY --from=build-stage /app/dist/job-connect-frontend/browser /usr/share/nginx/html

EXPOSE 80

#docker exec -it job-connect-frontend sh
#docker stop job-connect-frontend
#docker rm job-connect-frontend
#docker rmi rupesh1997/job-connect-frontend:1.0.0
#docker build -t rupesh1997/job-connect-frontend:1.0.0 -f docker/frontend/Dockerfile .
#docker run -p 8080:80 --name job-connect-frontend rupesh1997/job-connect-frontend:1.0.0