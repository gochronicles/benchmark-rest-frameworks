## RESTful API using FastAPI on Python

### Run instructions

```bash
python -m venv venv # create a virtual env
source venv/bin/activate # activate a virtual env
pip install -r requirements.txt # install dependencies
python app.py
```

### Docker
```bash
docker build . -t python-fastapi
docker run --rm -p 3000:3000 python-fastapi
```

Visit http://localhost:3000/
