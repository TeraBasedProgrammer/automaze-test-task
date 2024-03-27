FROM python:3.10.6-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1 

WORKDIR /code

COPY ["./back/requirements.txt", "./back/alembic.ini", "./"]

RUN pip install --no-cache-dir -r requirements.txt  

COPY ./back/app/ ./app/

COPY ./back/migrations ./migrations 

COPY ./back/entrypoint.sh .
RUN chmod +x /code/entrypoint.sh

EXPOSE 8000

ENTRYPOINT [ "/code/entrypoint.sh" ]
