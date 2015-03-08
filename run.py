import os
from server import app

port = int(os.environ.get('PORT', 33507))

app.debug = True
app.run(host='0.0.0.0', port=port)