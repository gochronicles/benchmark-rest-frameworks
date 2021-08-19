# Copyright (c) 2021 Go Chronicles
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

FROM python:3.9.6-slim as pythonBuilder
RUN apt-get update && apt-get upgrade -y
WORKDIR /app
COPY . .
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip install -U pip
RUN pip install -r requirements.txt
FROM python:3.9.6-alpine3.14 as pythonRuntime
RUN apk update && apk upgrade
WORKDIR /app
COPY --from=pythonBuilder /app /app
COPY --from=pythonBuilder /venv /venv
ENV PATH="/venv/bin:$PATH"
ENTRYPOINT [ "python" ]
CMD ["app.py"]
