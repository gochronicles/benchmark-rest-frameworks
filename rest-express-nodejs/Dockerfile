# Copyright (c) 2021 Go Chronicles
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

FROM node:14-alpine3.14
WORKDIR /app
COPY *.ts ./
COPY *.json ./
RUN npm i && npm run build
CMD ["npm", "run", "start"]