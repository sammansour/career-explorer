FROM fnproject/python:3.11-dev as build-stage
WORKDIR /function
ADD requirements.txt /function/
RUN pip3 install --target /python/ --no-cache-dir -r requirements.txt && rm -rf /python/.pip_cache

FROM fnproject/python:3.11
WORKDIR /function
COPY --from=build-stage /python /python
ADD . /function/
RUN chmod -R o+r /function
ENV PYTHONPATH=/python
ENTRYPOINT ["/python/bin/fdk", "/function/func.py", "handler"]