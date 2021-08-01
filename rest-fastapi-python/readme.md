## RESTful API using FastAPI on Python

### Run instructions

```bash
python -m venv venv # create a virtual env
source venv/bin/activate # activate a virtual env
pip install -r requirements.txt # install dependencies
uvicorn app:app --host 0.0.0.0 --port 3000
```

Visit http://localhost:3000/